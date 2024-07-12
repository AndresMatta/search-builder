import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Select} from 'antd';

import SearchQueryBuilderContext from './SearchQueryBuilderContext';

import SearchQueryBuilderRow from './SearchQueryBuilderRow';
import SearchQueryBuilderGroup from './SearchQueryBuilderGroup';

import {queryBuilderFormLayout} from '../assets/defaults';
import {merged, uuid} from '../util/helpers';
import {GROUP, RULE} from '../util/constants';

import Button from './components/Button';

function SearchQueryBuilderTree(props) {
    const {defaultSelectedConditionIndex, conditions, onSubmit, uiConfig, defaultQuery, onReset} = useContext(SearchQueryBuilderContext);

    const defaultCondition = conditions[defaultSelectedConditionIndex];

    const rules = {
        type: RULE,
        properties: {}
    };

    const defaultTree = {
        type: GROUP,
        condition: defaultCondition,
        childrens: {
            [uuid()]: rules
        },
        id: uuid()
    };

    const groups = {
        type: GROUP,
        childrens: {},
        condition: defaultCondition
    };

    const [builtQuery, setQuery] = useState(merged(defaultTree, defaultQuery));

    const submitForm = () => {
        onSubmit(builtQuery);
    };

    const addGroup = () => {
        builtQuery.childrens = Object.assign(builtQuery.childrens, {[uuid()]: groups});
        setQuery({...builtQuery});
    };

    const addRule = () => {
        builtQuery.childrens = Object.assign(builtQuery.childrens, {[uuid()]: rules});
        setQuery({...builtQuery});
    };

    const changeChildInfo = (newProperties, rowId, childrenId = null) => {
        Object.keys(builtQuery.childrens).forEach(item => {
            if(item === rowId) {
                if(builtQuery.childrens[item].type === GROUP && childrenId !== null) {
                    builtQuery.childrens[item] = newProperties;
                } else if(builtQuery.childrens[item].type === RULE) {
                    builtQuery.childrens[item].properties = newProperties[item];
                }
                setQuery({...builtQuery});
            }
        });
    };

    const deleteRow = (rowId) => {
        delete builtQuery.childrens[rowId];
        setQuery({...builtQuery});
    };

    const hardReset = () => {
        setQuery(defaultTree);
        onReset(defaultTree);
    };

    const changeCondition = (condition) => {
        builtQuery.condition = condition;
        setQuery({...builtQuery});
    };

    const renderRows = () => {
        if(builtQuery.childrens && Object.keys(builtQuery.childrens).length === 0) {
            addRule();
        }

        return (
            <Row className="main-group-children">
                {builtQuery.childrens && Object.keys(builtQuery.childrens).map((item, index) => {
                    const isOnly = Object.keys(builtQuery.childrens).length === 1 && index === 0;
                    if(builtQuery.childrens[item].type === RULE) {
                        return (
                            <SearchQueryBuilderRow
                                isBuildingMode={props.isBuildingMode}
                                defaultProperties={builtQuery.childrens[item]}
                                isRequired={isOnly}
                                ruleId={item}
                                onDelete={deleteRow}
                                onUpdate={changeChildInfo}
                                key={item}/>
                        );
                    } else if(builtQuery.childrens[item].type === GROUP) {
                        return (
                            <SearchQueryBuilderGroup
                                isBuildingMode={props.isBuildingMode}
                                defaultProperties={builtQuery.childrens[item]}
                                parentsCount={0}
                                isRequired={isOnly}
                                groupId={item}
                                onDelete={deleteRow}
                                onUpdate={changeChildInfo}
                                key={item}/>
                        );
                    }
                    return null;
                })}
            </Row>
        );
    };

    return (
        <Row>
            <Row className="header-container" justify="center">
                <Col {...queryBuilderFormLayout.rowsLayoutParams} >
                    <Select disabled={!props.isBuildingMode}
                        defaultValue={builtQuery.condition}
                        onSelect={changeCondition}>
                        {conditions.map(condition => (
                            <Select.Option key={condition} value={condition}>{condition}</Select.Option>))}
                    </Select>
                </Col>
                <Col {...queryBuilderFormLayout.contentColumnParameters} >
                    <Button type={'rule'}
                        ui={uiConfig.addRuleButton}
                        onClick={addRule}
                        disabled={!props.isBuildingMode}/>
                </Col>
                <Col {...queryBuilderFormLayout.contentColumnParameters} >
                    <Button type={'group'}
                        ui={uiConfig.addGroupButton}
                        onClick={addGroup}
                        disabled={!props.isBuildingMode}/>
                </Col>
            </Row>
            {renderRows()}
            {props.isBuildingMode && <Row className="main-buttons" gutter={10} justify="center">
                <Col {...queryBuilderFormLayout.buttonsLayoutParameters}>
                    <Button type={'build'}
                        generateId
                        onClick={submitForm}
                        disabled={!props.isBuildingMode}
                        ui={uiConfig.buildButton}
                    />
                </Col>
                <Col {...queryBuilderFormLayout.buttonsLayoutParameters}>
                    <Button type={'reset'}
                        generateId
                        onClick={hardReset}
                        disabled={!props.isBuildingMode}
                        ui={uiConfig.resetButton}
                    />
                </Col>
            </Row>}
        </Row>
    );
}


SearchQueryBuilderTree.propTypes = {
    isBuildingMode: PropTypes.bool
};

export default SearchQueryBuilderTree;