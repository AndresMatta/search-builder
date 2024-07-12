import React from 'react';
import PropTypes from 'prop-types';

import {Button as AntDesignButton, Icon} from 'antd';

import {defaultUiConfig} from '../../assets/defaults';
import {getValueByApproximatelyKey, merged} from '../../util/helpers';

const Button = ({type, ui, disabled, onClick, generateId}) => {
    const {className, text, icon} = merged(getValueByApproximatelyKey(defaultUiConfig, type), ui);
    return <AntDesignButton disabled={disabled}
        className={`${className}`}
        onClick={onClick}
        id={generateId ? `${type}_btn` : null}
    >
        {icon && <Icon type={icon}/>} {text}
    </AntDesignButton>;
};

Button.propTypes = {
    type: PropTypes.string.isRequired,
    ui: PropTypes.object,
    disabled: PropTypes.bool,
    generateId: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button;