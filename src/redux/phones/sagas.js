import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions as phoneActions } from './slice';
import { actions as interfaceActions } from '../interface/slice';
import { deletePhoneByIdApi, getPhonesApi, postPhoneApi, putPhoneApi } from '../../api/api';
import { toast } from 'react-toastify';

//Загрузка всех карточек //
export function* loadPhonesSaga() {
  try {
    const response = yield call(getPhonesApi);
    yield put(phoneActions.loadPhoneSuccess(response.data));
  } catch (err) {
    yield put(phoneActions.loadPhoneError(err));
    toast.error('Ошибка,телефоны не были загружены');
  }
}

//Удаление карточки //
export function* deletePhoneSaga({ payload }) {
  try {
    yield call(deletePhoneByIdApi, payload);
    yield put(phoneActions.deletePhoneSuccess(payload));
    yield put(interfaceActions.updateModalEditState(false));
    toast.success('Успешно');
  } catch (err) {
    yield put(phoneActions.deletePhoneError(err));
    yield put(interfaceActions.updateModalEditState(true));
    toast.error('Ошибка,телефон не был удален');
  }
}

//Добавление новой карточки//
export function* addPhoneSaga({ payload }) {
  try {
    yield call(postPhoneApi, payload);
    yield put(phoneActions.addPhoneSuccess(payload));
    yield put(interfaceActions.updateModalAddState(false));
    localStorage.clear();
    toast.success('Успешно');
  } catch (err) {
    yield put(phoneActions.addPhoneError(err));
    yield put(interfaceActions.updateModalAddState(true));
    toast.error('Ошибка,телефон не был добавлен');
  }
}

//Редактирование карточки//
export function* changePhoneSaga({ payload }) {
  try {
    yield call(putPhoneApi, payload);
    yield put(phoneActions.changePhoneSuccess(payload));
    yield put(interfaceActions.updateModalEditState(false));
    toast.success('Успешно');
  } catch (err) {
    yield put(phoneActions.changePhoneError(err));
    yield put(interfaceActions.updateModalEditState(true));
    toast.error('Ошибка,телефон не изменен');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(phoneActions.loadPhones, loadPhonesSaga),
    yield takeLatest(phoneActions.deletePhone, deletePhoneSaga),
    yield takeLatest(phoneActions.addPhone, addPhoneSaga),
    yield takeLatest(phoneActions.changePhone, changePhoneSaga),
  ]);
}
