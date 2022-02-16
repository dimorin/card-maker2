class ImageUploader{
    async upload(file){
        const formData = new FormData();
        formData.append("file", file);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET); //setting -> upload -> unsigned 에서 preset 이름을 가져온다.

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`, { // cloudname
            method: "POST",
            body: formData
        });
        return await res.json();        
    }
}

export default ImageUploader;