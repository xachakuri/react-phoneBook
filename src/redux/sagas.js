import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { deletePhoneByIdApi, getPhonesApi, postPhoneApi, putPhoneApi } from '../api/api';
import { toast } from 'react-toastify';

//Загрузка всех карточек //
export function* loadPhonesSaga() {
  yield delay(300);
  try {
    const response = yield call(getPhonesApi);
    yield put(actions.loadPhoneSuccess(response.data));
  } catch (err) {
    yield put(actions.loadPhoneError(err));
    toast.error('Ошибка,телефоны не были загружены');
  }
}

//Удаление карточки //
export function* deletePhoneSaga({ payload }) {
  yield delay(100);
  try {
    yield call(deletePhoneByIdApi, payload);
    yield put(actions.deletePhoneSuccess(payload));
    toast.success('Успешно');
  } catch (err) {
    yield put(actions.deletePhoneError(err));
    toast.error('Ошибка,телефон не был удален');
  }
}

//Добавление новой карточки//
export function* addPhoneSaga({ payload }) {
  yield delay(100);
  try {
    yield call(postPhoneApi, payload);
    yield put(actions.addPhoneSuccess(payload));
    toast.success('Успешно');
  } catch (err) {
    yield put(actions.addPhoneError(err));
    toast.error('Ошибка,телефон не был добавлен');
  }
}

//Редактирование карточки//
export function* changePhoneSaga({ payload }) {
  yield delay(100);
  try {
    yield call(putPhoneApi, payload);
    yield put(actions.changePhoneSuccess(payload));
    toast.success('Успешно');
  } catch (err) {
    yield put(actions.changePhoneError(err));
    toast.error('Ошибка,телефон не изменен');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(actions.loadPhones, loadPhonesSaga),
    yield takeLatest(actions.deletePhone, deletePhoneSaga),
    yield takeLatest(actions.addPhone, addPhoneSaga),
    yield takeLatest(actions.changePhone, changePhoneSaga),
  ]);
}
