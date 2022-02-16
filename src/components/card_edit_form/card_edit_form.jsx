import React from 'react';
import styles from './card_edit_form.module.css';
import Button from '../button/button';

const CardEditForm = ({FileInput, card, updateCard, deleteCard}) => {
    const {name, company, title, email, message, theme, fileName} = card;
    const onSubmit = (event) => {
        event.preventDefault();
        deleteCard(card);
    };
    const onChange = (event) => {
        if(!event.currentTarget){
            return;
        }
        event.preventDefault();
        updateCard({...card, [event.currentTarget.name]:event.currentTarget.value})
    };
    const onFileChange = (file) => {        
        updateCard({...card, fileName:file.name, fileURL:file.url});
    };
    return (
        <form className={styles.form}>
            <input className={styles.input} type="text" name="name" value={name} onInput={onChange} />
            <input className={styles.input} type="text" name="company" value={company} onInput={onChange} />
            <select className={styles.select} name="theme" value={theme} onInput={onChange} >
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="colorful">colorful</option>
            </select>
            <input className={styles.input} type="text" name="title" value={title} onInput={onChange} />
            <input className={styles.input} type="text" name="email" value={email} onInput={onChange} />
            <textarea className={styles.textarea} name="message" value={message} onInput={onChange} ></textarea>
            <div className={styles.fileInput}>
                <FileInput name={fileName} onFileChange={onFileChange} />
            </div>
            <Button name='Delete' onClick={onSubmit}></Button>
        </form>
    )
};

export default CardEditForm;