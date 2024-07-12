function formatRule(rule) {
    const {properties: {type, ...options}} = rule;
    if(!type) {
        return '';
    }
    const optionsList = Object.values(options);
    let formatted;
    if(optionsList.length === 1) {
        formatted = `${type} = ${optionsList[0]}`;
    } else if(optionsList.length === 2){
        formatted = `${type} BETWEEN (${optionsList.join(' AND ')})`;
    } else if(optionsList.length > 2){
        formatted = `${type} IN (${optionsList.join(', ')})`;
    }
    // TODO rest
    return formatted;
}

const formatGroup = (group) => {
    const subsequents = sqlize(group);
    if(subsequents) {
        return `(${subsequents})`;
    }
    return subsequents;
};

const appendCondition = (part1, part2, condition) => part1 && part2
    ? `${part1} ${condition} ${part2}`
    : `${part1}${part2}`;

export function sqlize(query) {
    return Object.values(query.children).reduce((formatted, currentElement) => {
        if(currentElement.type === 'RULE') {
            return appendCondition(formatted, formatRule(currentElement), query.condition);
        } else if(currentElement.type === 'GROUP') {
            return appendCondition(formatted, formatGroup(currentElement), query.condition);
        } else {
            throw Error('Incorrect type');
        }
    }, '');
}