export const uuid = () => `ID${+new Date() + Math.floor(Math.random() * 999999)}`;

const setStylePropertyOf = (element, property, value) => element.style.setProperty(property, value);

/**
 * @param {HTMLElement} root
 * @param {Object} theme
 * @param {string} prefix
 * @returns {void}
 * @description applies the theme by creating css variables to the root element
 */
export const applyTheme = (root, theme, prefix) => {
    if(theme) {
        Object.keys(theme).forEach((key) => {
            setStylePropertyOf(root, `${prefix}${key}`, theme[key]);
        });
    }
};

/**
 * @param {HTMLElement} root
 * @param {Object} theme
 * @param {string} prefix
 * @returns {void}
 * @description resets the theme by setting css variables to initial values and applies it to the root element
 */
export const resetTheme = (root, theme, prefix) => {
    Object.keys(theme).forEach((key) => {
        setStylePropertyOf(root, `${prefix}${key}`, 'initial');
    });
};

/**
 * @param {HTMLElement} htmlElement
 * @returns {void}
 * @description scrolls to the beginning of the element
 */
export const scroll2BeginningOf = htmlElement => htmlElement.scrollTo(0, 0);

/**
 * @param {object} obj
 * @param {string} approximateKey
 * @returns {?}
 * @description tries to find a value by approximately key
 * @example
 * getValueByApproximatelyKey(
 *      {
 *          'someKey' : 'some value',
 *          'someAnotherKey' : 'some another value'
 *      },
 *      'another'
 * ) // 'some another value'
 */
export const getValueByApproximatelyKey = (obj, approximateKey) => obj[Object.keys(obj)
    .find(e => e.toLowerCase().includes(approximateKey.toLowerCase()))];

/**
 * @param {...{}} objects
 * @returns {Object}
 * @description merge objects with increasing priority of the arguments

 */
export const merged = (...objects) => objects.reduce((previous, next) => ({...previous, ...next}) , {});

