import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css';
import App from './app';
import {firebaseApp} from './service/firease';
import AuthService from './service/auth_service';
import CardRepository from './service/card_repository';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';

const authService = new AuthService(firebaseApp);
const cardRepository = new CardRepository(firebaseApp);
const imageUploader = new ImageUploader();
// 이미지파일을 입력하기 위해 너무 많은 컴포넌트에 관련 props을 전달하는 것 보다
// 이미지파일 입력 컴포넌트 자체를 prop으로 전달하는 것이 더 효율적이다.
const FileInput = memo(props => ( // 이미지파일입력을 한 단계 감씬 컴포넌트, 컴포넌트 prop 인 경우, 대문자로 시작
  <ImageFileInput {...props} imageUploader={imageUploader} /> // props의 확장성을 위해 {...props} 와 같이 표현함
));

ReactDOM.render(
  <React.StrictMode>
    <App FileInput={FileInput} authService={authService} cardRepository={cardRepository} />
  </React.StrictMode>,
  document.getElementById('root')
);
