import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Select} from 'antd';

import SearchQueryBuilderContext from './SearchQueryBuilderContext';

import SearchQueryBuilderRow from './SearchQueryBuilderRow';

import {uuid} from '../util/helpers';
import {GROUP, RULE} from '../util/constants';
import {queryBuilderFormLayout} from '../assets/defaults';

import Button from './components/Button';

function SearchQueryBuilderGroup(props) {

    const {defaultSelectedConditionIndex, conditions, uiConfig} = useContext(SearchQueryBuilderContext);

    const rules = {
        type: RULE,
        properties: {}
    };

    const groups = {
        type: GROUP,
        childrens: {},
        condition: conditions[defaultSelectedConditionIndex]
    };
    const [groupData, setGroupData] = useState({
        type: props.defaultProperties.type,
        childrens: props.defaultProperties.childrens,
        condition: props.defaultProperties.condition
    });

    const addRule = () => {
        groupData.childrens = Object.assign(groupData.childrens, {[uuid()]: rules});
        setGroupData({...groupData});
    };

    const addGroup = () => {
        groupData.childrens = Object.assign(groupData.childrens, {[uuid()]: groups});
        setGroupData({...groupData});
    };

    const changeChildInfo = (newProperties, rowId, childId = null) => {
        Object.keys(groupData.childrens).forEach(item => {
            if(item === rowId) {
                if(groupData.childrens[item].type === GROUP && childId !== null) {
                    groupData.childrens[item] = newProperties;
                } else if(groupData.childrens[item].type === RULE) {
                    groupData.childrens[item].properties = newProperties[item];
                }
                setGroupData({...groupData});
            }
        });
        props.onUpdate(groupData, props.groupId, childId);
    };

    const deleteRow = (rowId) => {
        delete groupData.childrens[rowId];
        setGroupData({...groupData});
    };

    const changeCondition = (val) => {
        groupData.condition = val;
        setGroupData({...groupData});
        props.onUpdate(groupData, props.groupId, props.groupId);
    };

    const deleteGroupRow = () => {
        props.onDelete(props.groupId);
    };

    const renderRows = () => {
        if(Object.keys(groupData.childrens).length === 0) {
            addRule();
        }
        return (<Row className="group-children">{Object.keys(groupData.childrens).map((item, index) => {
            const isOnly = Object.keys(groupData.childrens).length === 1 && index === 0;

            if(groupData.childrens[item].type === RULE) {
                return (
                    <SearchQueryBuilderRow
                        isBuildingMode={props.isBuildingMode}
                        defaultProperties={groupData.childrens[item]}
                        isRequired={isOnly}
                        ruleId={item}
                        onDelete={deleteRow}
                        onUpdate={changeChildInfo}
                        key={item}/>
                );
            } else if(groupData.childrens[item].type === GROUP) {
                return (
                    <SearchQueryBuilderGroup
                        isBuildingMode={props.isBuildingMode}
                        defaultProperties={groupData.childrens[item]}
                        parentsCount={props.parentsCount + 1}
                        isRequired={isOnly}
                        groupId={item}
                        onDelete={deleteRow}
                        onUpdate={changeChildInfo}
                        key={item}/>
                );
            }
            return null;
        })} </Row>);
    };

    const getAddGroupButton = (isBuildingMode, condition) => condition ? (
        <Col {...queryBuilderFormLayout.contentColumnParameters}>
            <Button type={'group'} ui={uiConfig.addGroupButton} onClick={addGroup} disabled={!isBuildingMode}/>
        </Col>
    ) : null;

    const getAddRuleButton = (isBuildingMode) => (
        <Col {...queryBuilderFormLayout.contentColumnParameters}>
            <Button type={'rule'} ui={uiConfig.addRuleButton} onClick={addRule} disabled={!isBuildingMode}/>
        </Col>
    );

    const getConditions = (selected, isBuildingMode) => (
        <Col {...queryBuilderFormLayout.rowsLayoutParams}>
            <Select disabled={!isBuildingMode}
                defaultValue={selected}
                onSelect={changeCondition}>
                {
                    conditions.map(condition =>
                        <Select.Option key={condition} value={condition}>{condition}</Select.Option>
                    )
                }
            </Select>
        </Col>
    );


    return (
        <Row className="group-rows">
            <Row>
                <Row className={`header-container  ${!props.isRequired ? 'with_delete_button' : ''}`} justify="center">
                    <Col>
                        {getConditions(props.defaultProperties.condition, props.isBuildingMode)}
                        {getAddRuleButton(props.isBuildingMode)}
                        {getAddGroupButton(props.isBuildingMode, props.parentsCount < 2)}
                    </Col>
                    <Col className="delete-btn-right" {...queryBuilderFormLayout.deleteButtonLayoutParameters}>
                        {!props.isRequired ?
                            <Button type={'delete'} ui={uiConfig.deleteButton} disabled={!props.isBuildingMode} onClick={deleteGroupRow}/> : null
                        }
                    </Col>
                </Row>
                {renderRows()}
            </Row>
        </Row>
    );
}

SearchQueryBuilderGroup.propTypes = {
    isBuildingMode: PropTypes.bool,
    defaultProperties: PropTypes.shape({
        type: PropTypes.string,
        childrens: PropTypes.shape({
            [PropTypes.number]: PropTypes.shape({
                type: PropTypes.string,
                properties: PropTypes.object
            })
        }),
        condition: PropTypes.string
    }),
    isRequired: PropTypes.bool,
    parentsCount: PropTypes.number,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    groupId: PropTypes.string
};

export default SearchQueryBuilderGroup;