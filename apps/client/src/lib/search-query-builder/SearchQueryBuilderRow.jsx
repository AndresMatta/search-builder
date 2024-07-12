import React, {useContext, useState, useEffect} from 'react';
import {Col, Row, Select, DatePicker, Tooltip} from 'antd';
import PropTypes from 'prop-types';

import {queryBuilderFormLayout, defaultDateFormat} from '../assets/defaults';

import SearchQueryBuilderContext from './SearchQueryBuilderContext';

import Button from './components/Button';

import moment from 'moment';

function SearchQueryBuilderRow(props) {
    const [ruleValue, setRuleValue] = useState(props.defaultProperties ? props.defaultProperties.properties.type : null);

    const {mainConfig, mainSelectInfo, uiConfig, form} = useContext(SearchQueryBuilderContext);

    const {getFieldDecorator, getFieldsValue, resetFields} = form;
    const [isValidate, setIsValidate] = useState(false);

    useEffect(() => {
        const values = getFieldsValue();
        let flag = true;
        mainConfig[ruleValue] && mainConfig[ruleValue].map((option) => {
            if(option.priority === 'required' && flag) {
                if(!values[props.ruleId][option.key]) {
                    flag = false;
                }
            }
        });
        setIsValidate(flag);
    });

    const selectRule = (rule) => {
        if(rule !== ruleValue) {
            resetFields(props.ruleId, true);
            props.onUpdate({
                [props.ruleId]: {
                    [mainSelectInfo.key]: rule
                }
            }, props.ruleId);
            setRuleValue(rule);
        }
    };

    const getDateValue = (option) => {
        const format = option.format ? option.format : defaultDateFormat;
        const value = getFieldsValue()[props.ruleId][option.key];
        return value ? value.format(format) : null;
    };

    const changeWhallInfo = () => {
        const values = getFieldsValue();
        mainConfig[ruleValue].map((option) => {
            if(option.type === 'date') {
                const value = getDateValue(option);
                values[props.ruleId][option.key] = value;
            }
            if(!values[props.ruleId][option.key] && option.priority === 'not_required') {
                delete values[props.ruleId][option.key];
            }
        });
        return values;
    };

    const chandeDate = (optionName, date) => {
        const values = changeWhallInfo();
        if(date !== '') {
            values[props.ruleId][optionName] = date;
        } else if(date === '' && values[props.ruleId][optionName]) {
            delete values[props.ruleId][optionName];
        }
        props.onUpdate(values, props.ruleId);
    };

    const changeOption = (e, option) => {
        const values = changeWhallInfo();
        if(!e && option.priority === 'not_required' ) {
            delete values[props.ruleId][option.key];
        } else if(e) {
            values[props.ruleId][option.key] = e;
        }
        props.onUpdate(values, props.ruleId);
    };

    const deleteRow = () => {
        props.onDelete(props.ruleId);
    };

    const selectedValuesOf = (option) => {
        if(option.type === 'date') {
            return (props.defaultProperties && props.defaultProperties.properties[option.key]) ? moment(props.defaultProperties.properties[option.key]) : null;
        } else {
            return props.defaultProperties && props.defaultProperties.properties[option.key] ? props.defaultProperties.properties[option.key] : undefined;
        }
    };

    const renderSelects = () => {
        const current = mainConfig[ruleValue];
        if(!current) {
            return null;
        }
        return Object.values(current).map((option, i) => {
            if(isValidate || option.priority !== 'not_required'){
                if(option.type === 'date') {
                    return (<Col key={option.key + i} {...queryBuilderFormLayout.datesLayoutParams}>
                        <Tooltip placement="topLeft" title={option.placeholder}>
                            {getFieldDecorator(`${props.ruleId}[${option.key}]`, {initialValue: selectedValuesOf(option)})(
                                <DatePicker className="rowDate" disabled={!props.isBuildingMode} placeholder={option.placeholder} format={option.format} onChange={(e, date) => chandeDate(option.key, date)} />
                            )}
                        </Tooltip>
                    </Col>);
                } else if(option.type === 'select') {
                    const selectedItems= [];
                    const filteredOptions = option.items.filter(o => !selectedItems.includes(o));
                    return (<Col key={option.key + i} {...queryBuilderFormLayout.selectsLayoutParams}>
                        <Tooltip placement="topLeft" title={option.placeholder}>
                            {getFieldDecorator(`${props.ruleId}[${option.key}]`, {initialValue: selectedValuesOf(option)})(
                                <Select
                                    showSearch
                                    disabled={!props.isBuildingMode}
                                    placeholder={option.placeholder}
                                    onChange={(e) => changeOption(e, option)}
                                >
                                    {filteredOptions.map(item => {
                                        return <Select.Option
                                            key={item.name}
                                            label={item.name}>
                                            {item.name}{item.comment ? ` ${item.comment}` : ''}
                                        </Select.Option>;
                                    })}
                                </Select>
                            )}
                        </Tooltip>
                    </Col>);
                }
            }
        });
    };

    return (
        <Row className="rule-rows">
            <Col {...queryBuilderFormLayout.mainSelectsLayoutParams} >
                <Tooltip placement="topLeft" title={mainSelectInfo.placeholder}>
                    {getFieldDecorator(`${props.ruleId}[${mainSelectInfo.key}]`, {initialValue: ruleValue})(
                        <Select placeholder={mainSelectInfo.placeholder}
                            disabled={!props.isBuildingMode}
                            onSelect={selectRule}>
                            {Object.keys(mainConfig).map((item) => {
                                return <Select.Option key={item}>{item}</Select.Option>;
                            })}
                        </Select>
                    )}
                </Tooltip>
            </Col>
            {renderSelects()}
            <Col className="delete-btn-right" {...queryBuilderFormLayout.deleteButtonLayoutParameters}>
                {!props.isRequired ?
                    <Button type={'delete'} disabled={!props.isBuildingMode} ui={uiConfig.deleteButton} onClick={deleteRow}/> : null
                }
            </Col>
        </Row>
    );
}

SearchQueryBuilderRow.propTypes = {
    isBuildingMode: PropTypes.bool,
    ruleId: PropTypes.string,
    defaultProperties: PropTypes.object,
    isRequired: PropTypes.bool,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
};

export default SearchQueryBuilderRow;