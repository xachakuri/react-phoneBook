import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { deletePhoneByIdApi, getPhonesApi, postPhoneApi, putPhoneApi } from '../api/api';

//Загрузка всех карточек //
export function* loadPhonesSaga() {
  try {
    const response = yield call(getPhonesApi);
    yield delay(400);
    yield put(actions.loadPhoneSuccess(response.data));
  } catch (err) {
    yield put(actions.loadPhoneError(err));
    console.log('err');
  }
}

//Удаление карточки //
export function* deletePhoneSaga({ payload: { id } }) {
  try {
    yield call(deletePhoneByIdApi, { id });
    yield delay(200);
    yield put(actions.deletePhoneSuccess({ id }));
  } catch (err) {
    yield put(actions.deletePhoneError(err));
    console.log('err');
  }
}

//Добавление новой карточки//
export function* addPhoneSaga({ payload: { id, nameUser, phone, city, dateRegistration } }) {
  try {
    yield call(postPhoneApi, { id, nameUser, phone, city, dateRegistration });
    yield delay(200);
    yield put(actions.addPhoneSuccess({ id, nameUser, phone, city, dateRegistration }));
  } catch (err) {
    yield put(actions.addPhoneError(err));
    console.log('err');
  }
}

//Редактирование карточки//
export function* changePhoneSaga({ payload: { id, nameUser, phone, city, dateRegistration } }) {
  try {
    yield call(putPhoneApi, { id, nameUser, phone, city, dateRegistration });
    yield delay(200);
    yield put(actions.changePhoneSuccess({ id, nameUser, phone, city, dateRegistration }));
  } catch (err) {
    yield put(actions.changePhoneError(err));
    console.log('err');
  }
}

export default function* rootSaga() {
  yield takeLatest(actions.loadPhones, loadPhonesSaga);
  yield takeLatest(actions.deletePhone, deletePhoneSaga);
  yield takeLatest(actions.addPhone, addPhoneSaga);
  yield takeLatest(actions.changePhone, changePhoneSaga);
}
