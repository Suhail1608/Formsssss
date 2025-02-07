export const getDate = new Date().toLocaleDateString("en-CA");
export const getTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return (`${hours}:${minutes}`)
}
export const getDropDownList = (list, name, id) => {
    data?.map((item) => (
        {
            label: item[name],
            value: item[id]
        }
    ))
}