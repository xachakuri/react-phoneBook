import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, FormField } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatter } from '../../../utils';
import * as Yup from 'yup';
import { addPhone, editValue, removePhone } from '../../../redux';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './ModalForm.module.scss';
import { formStore } from '../../../redux/selector';

const phoneRegExp =
  /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
const cityRegExp = /^[A-Za-zА-Яа-яЁё]+$/;
const validationSchema = Yup.object().shape({
  nameUser: Yup.string()
    .required('❗ Поле обязательно к заполнению')
    .max(20, '❗ Слишком длинное имя'),
  city: Yup.string()
    .required('❗ Поле обязательно к заполнению')
    .max(20, '❗ Слишком длинное слово')
    .matches(cityRegExp, '❗ Введите город без цифр'),
  phone: Yup.string()
    .required('❗ Поле обязательно к заполнению')
    .matches(phoneRegExp, ' ❗Введите правильный номер телефона'),
  dateRegistration: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('❗ Поле обязательно к заполнению'),
});

export const ModalForm = ({ onClose, isEdit, id, onCreate }) => {
  const dispatch = useDispatch();
  const formValues = useSelector(formStore);
  const localStorageValue = JSON.parse(localStorage.getItem('form'));
  const initialValue = useMemo(() => {
    return isEdit ? formatter(formValues) : formatter(localStorageValue);
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
  useEffect(() => {
    watch((value) => (isEdit ? '' : localStorage.setItem('form', JSON.stringify(value))));
  }, [watch]);
  const onSubmitEdit = useCallback(
    (data) => {
      dispatch(editValue({ id, ...data, dateRegistration: data.dateRegistration.toString() }));
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
        <Button type="submit" onClick={onCreate}>
          Добавить
        </Button>
      )}
    </form>
  );
};
