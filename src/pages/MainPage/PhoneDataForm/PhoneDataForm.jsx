import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, FormField } from '../../../components';
import { formattingDataPhone } from '../../../utils';
import { addPhone, editPhone, removePhone } from '../../../redux';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './PhoneDataForm.module.scss';
import PropTypes from 'prop-types';

const phoneRegExp =
  /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
const validationSchema = Yup.object().shape({
  nameUser: Yup.string()
    .required('❗ Поле обязательно к заполнению')
    .max(20, '❗ Слишком длинное имя'),
  city: Yup.string()
    .required('❗ Поле обязательно к заполнению')
    .max(20, '❗ Слишком длинное слово'),
  phone: Yup.string()
    .required('❗ Поле обязательно к заполнению')
    .matches(phoneRegExp, ' ❗Введите правильный номер телефона'),
  dateRegistration: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('❗ Поле обязательно к заполнению'),
});
export const PhoneDataForm = ({ onClose, isEdit, id, getPhone }) => {
  const dispatch = useDispatch();
  const formValue = getPhone;
  const localStorageValue = JSON.parse(localStorage.getItem('form'));
  const initialValue = useMemo(() => {
    return isEdit ? formattingDataPhone(formValue) : formattingDataPhone(localStorageValue);
  }, [isEdit]);
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  const onSubmit = useCallback(
    (data) => {
      dispatch(
        addPhone({
          ...data,
          dateRegistration: data.dateRegistration.toString(),
        }),
      );
      reset();
      onClose();
      localStorage.clear();
    },
    [dispatch],
  );
  const checkLocalStorage = (value) => {
    if (!isEdit) {
      localStorage.setItem('form', JSON.stringify(value));
    }
  };
  useEffect(() => {
    const subscription = watch((value) => checkLocalStorage(value));
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
  const onSubmitEdit = useCallback(
    (data) => {
      dispatch(editPhone({ id, ...data, dateRegistration: data.dateRegistration.toString() }));
      onClose();
    },
    [dispatch],
  );
  const deletePhoneHandler = useCallback(() => {
    dispatch(removePhone({ id }));
    onClose();
  }, [id, dispatch]);

  return (
    <form onSubmit={handleSubmit(isEdit ? onSubmitEdit : onSubmit)}>
      <FormField label="Имя" errors={errors.nameUser?.message}>
        <Input
          placeholder="Введите имя"
          register={register}
          name="nameUser"
          theme="modal"
          className={`form-control ${errors.nameUser ? 'is-invalid' : ''}`}
          autoFocus={true}
        />
      </FormField>
      <FormField label="Город" errors={errors.city?.message}>
        <Input
          placeholder="Введите город"
          register={register}
          name="city"
          theme="modal"
          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
        />
      </FormField>
      <FormField label="Дата регистрации" errors={errors.dateRegistration?.message}>
        <Controller
          control={control}
          name="dateRegistration"
          render={({ field }) => (
            <DatePicker
              placeholderText="Выберите дату"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              showMonthDropdown
              showYearDropdown
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
              dropdownMode="select"
              customInput={
                <Input
                  className={`form-control ${errors.dateRegistration ? 'is-invalid' : ''}`}
                  theme="modal"
                />
              }
            />
          )}
        />
      </FormField>
      <FormField label="Телефон" errors={errors.phone?.message}>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, name, value } }) => (
            <NumberFormat
              customInput={Input}
              theme="modal"
              type="tel"
              format="+7 (###) ###-##-##"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              name={name}
              value={value}
              onChange={onChange}
              placeholder="Введите телефон"
            />
          )}
        />
      </FormField>
      {isEdit ? (
        <div className={styles.modalFormButtons}>
          <Button type="submit">Сохранить</Button>
          <Button onClick={deletePhoneHandler}>Удалить</Button>
        </div>
      ) : (
        <Button type="submit">Добавить</Button>
      )}
    </form>
  );
};

PhoneDataForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  getPhone: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
