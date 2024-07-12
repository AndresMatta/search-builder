import { Injectable } from '@nestjs/common';
import { UserFilterType } from '@search-builder/http-types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets, SelectQueryBuilder, In } from 'typeorm';
import { User } from './user.entity';
import { FilterDto, RuleDto, GroupDto, CreateUserDto } from './user.dto';
import { Role } from '../roles/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  public async getUsersByFilter(filterDto: FilterDto): Promise<User[]> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role');

    this.applyFilters(queryBuilder, filterDto.filter);

    queryBuilder.printSql();

    return queryBuilder.getMany();
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, joined_at, roleIds } = createUserDto;

    const roles = await this.roleRepository.findBy({ id: In(roleIds) });

    const user = new User();
    user.name = name;
    user.email = email;
    user.joined_at = joined_at;
    user.roles = roles;

    return await this.userRepository.save(user);
  }

  private applyFilters(
    queryBuilder: SelectQueryBuilder<User>,
    group: GroupDto,
    alias = 'user'
  ) {
    const conditions = [];
    const params = {};

    Object.keys(group.childrens).forEach((key) => {
      const child = group.childrens[key];

      if (child.type === 'rule') {
        const rule = child as RuleDto;

        if (rule.properties.type === UserFilterType.JOINED) {
          const paramName = `joined_at_${key}`;
          conditions.push(`${alias}.joined_at > :${paramName}`);
          params[paramName] = rule.properties.joined_at;
        } else if (rule.properties.type === UserFilterType.ROLE) {
          const paramName = `role_${key}`;
          conditions.push(`role.name = :${paramName}`);
          params[paramName] = rule.properties.role;
        }
      } else if (child.type === 'group') {
        const childGroup = child as GroupDto;
        const childAlias = `child${Math.random().toString(36).substring(7)}`;
        this.applyFilters(queryBuilder, childGroup, childAlias);
      }
    });

    if (conditions.length > 0) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(conditions.join(` ${group.condition} `), params);
        })
      );
    }
  }
}
