import React, { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, FormField } from '../../../components';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { addPhone } from '../../../redux';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './ModalForm.module.scss';

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
const formatter = () => {
  const val = JSON.parse(localStorage.getItem('form'));
  if (!val) {
    return {};
  }
  return {
    ...val,
    dateRegistration: val.dateRegistration ? new Date(val.dateRegistration) : '',
  };
};
export const ModalForm = ({ onClose, isEdit }) => {
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formatter(),
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
    watch((value) => localStorage.setItem('form', JSON.stringify(value)));
  }, [watch]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <FormField label="Введите дату регистрации" errors={errors.dateRegistration?.message}>
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
          <Button>Редактировать</Button>
          <Button>Отмена</Button>
        </div>
      ) : (
        <Button type="submit">Добавить</Button>
      )}
    </form>
  );
};
