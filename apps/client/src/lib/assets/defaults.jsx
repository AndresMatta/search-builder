export const queryBuilderFormLayout = {
    contentColumnParameters: {
        xs: {span: 6},
        sm: {span: 6},
        md: {span: 6},
        lg: {span: 6},
        xl: {span: 5},
        xxl: {span: 3}
    },
    rowsLayoutParams: {
        xs: {span: 3},
        sm: {span: 3},
        md: {span: 3},
        lg: {span: 3},
        xl: {span: 3},
        xxl: {span: 2}
    },
    selectsLayoutParams: {
        xs: {span: 24},
        sm: {span: 24},
        md: {span: 4},
        lg: {span: 4},
        xl: {span: 4},
        xxl: {span: 4}
    },
    mainSelectsLayoutParams: {
        xs: {span: 24},
        sm: {span: 24},
        md: {span: 3},
        lg: {span: 3},
        xl: {span: 3},
        xxl: {span: 3}
    },
    datesLayoutParams: {
        xs: {span: 24},
        sm: {span: 24},
        md: {span: 4},
        lg: {span: 4},
        xl: {span: 4},
        xxl: {span: 4}
    },
    buttonsLayoutParameters: {
        xs: {span: 8},
        sm: {span: 8},
        md: {span: 4},
        lg: {span: 4},
        xl: {span: 4},
        xxl: {span: 2}
    },
    deleteButtonLayoutParameters: {
        xs: {span: 24},
        sm: {span: 1},
        md: {span: 1},
        lg: {span: 1},
        xl: {span: 1},
        xxl: {span: 1}
    }
};

export const defaultConfig = {
    'CATEGORY': [
        {
            'key': 'option',
            'placeholder': 'Option',
            'type': 'select',
            'items': [
                {
                    'name': 'First'
                },
                {
                    'name': 'Second'
                },
                {
                    'name': 'Third'
                }
            ]
        }
    ]
};

export const defaultDateFormat = 'DD-MM-YYYY';

export const defaultSelectInfo = {
    'placeholder': 'Criteria',
    'key': 'type'
};


const primaryColor = '#266494';
const secondaryColor = '#00728d';
const accentColor = '#c85100';
const lightestColor = 'white';
const darkestColor = '#001a46';

export const defaultTheme = {
    primaryColor,
    secondaryColor,
    accentColor,
    lightestColor,
    darkestColor
};

export const defaultUiConfig = {
    addRuleButton: {
        text: 'RULE',
        icon: 'plus',
        className: 'add-rule-btn'
    },
    addGroupButton: {
        text: 'GROUP',
        icon: 'plus-circle',
        className: 'add-group-btn'
    },
    buildButton: {
        text: 'BUILD',
        icon: '',
        className: ''
    },
    resetButton: {
        text: 'RESET',
        icon: '',
        className: ''
    },
    deleteButton: {
        text: '',
        icon: 'delete',
        className: 'delete-btn'
    },
    mainContainer: {
    }
};

export const defaultStyles = {
    FormBorders: {
        width: {
            size: 1,
            measurement: 'px'
        },
        style: 'solid',
        radius: {
            size: 10,
            measurement: 'px'
        }
    },
    TreeLines: {
        width: {
            size: 2,
            measurement: 'px'
        }
    },
    Footer: {
        justify_content: 'center'
    },
    Collapsing: {
        size: 89,
        measurement: 'px'
    }
};

export const defaultConditions = ['AND', 'OR'];
