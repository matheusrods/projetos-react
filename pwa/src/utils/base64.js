const getBase64 = async (file) => {
    return new Promise((resolve) => {
        let fileInfo;
        let baseURL = "";
        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
        };

        return fileInfo;
    });
};
export { getBase64 };
