export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    return items.map((el: any) => {
        if (el[objPropName] === itemId) {
            return {
                ...el,
                ...newObjProps
            }
        }
        return el
    })
};