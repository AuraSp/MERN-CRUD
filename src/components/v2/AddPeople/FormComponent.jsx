import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from 'sweetalert2';

import './AddForm.css';


function FormComponent({ userType, setIsFormOpen, setIsRendering }) {

    const [screenSize, setScreenSize] = useState('');
    const [isButtonAppended, setIsButtonAppended] = useState(false);



    const userSchema = yup.object().shape({
        name: yup
            .string()
            .nullable(false)
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž]*$/, { message: 'Only letters are allowed and no blank' })
            .min(3, 'At least 3 characters')
            .max(15, 'Must not exceed 15 characters')
            .required('Name is required'),
        surname: yup
            .string()
            .nullable(false)
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž]+$/, 'Only letters are allowed and no blank')
            .max(10, 'Must not exceed 10 characters')
            .strict(),
        birthdate: yup
            .date()
            .nullable()
            .min(new Date(1950, 1, 1), 'Date cannot be before 1950')
            .max(new Date(), 'Date cannot be in the future')
            .typeError('Birthdate must be a valid date')
            .required('Birthdate is required'),
        town: yup
            .string()
            .nullable(false)
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s'-]+$/, 'Numbers is not allowed')
            .strict()
            .required('Town is required'),

        ...(userType.hasOwnProperty('students') ? {
            program: yup
                .string()
                .nullable(false)
                .oneOf(['JavaScript', 'Java', 'PHP', 'Python', 'Tester'], 'Program must be chosen')
                .required('Program must be chosen'),
            group: yup
                .string()
                .nullable(false)
                .oneOf(['1', '2', '3'], 'Group must be chosen')
                .required('Group must be chosen'),
        } : {}),
        ...(userType.hasOwnProperty('teachers') ? {
            subject: yup
                .string()
                .nullable(false)
                .strict()
                .oneOf(['JavaScript', 'Java', 'PHP', 'Python', 'Tester'], 'Subject must be chosen')
                .required('Subject must be chosen'),
            subjectGroup: yup
                .string()
                .nullable(false)
                .oneOf(['1', '2', '3'], `Subject group must be chosen`)
                .required('Subject Group must be chosen'),
        } : {}),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }, } = useForm({
            resolver: yupResolver(userSchema)
        });


    const onSubmit = async (sendData) => {
        console.debug('%cForm data:', 'color:blue', sendData);


        try {
            await userSchema.validate(sendData);
            console.warn('%cValidation:', 'color:orange', 'Validation passed');

            const apiUrl = userType.hasOwnProperty('teachers')
                ? process.env.REACT_APP_API_URL_TEACHERS
                : process.env.REACT_APP_API_URL_STUDENTS;

            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: sendData.name,
                    surname: sendData.surname,
                    birthdate: sendData.birthdate,
                    town: sendData.town,
                    program: sendData.program,
                    group: sendData.group,
                    subject: sendData.subject,
                    subjectGroup: sendData.subjectGroup,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.info('%cSuccess:', 'color: green', data.data.teacher);
                    setIsRendering(prevState => !prevState)

                })
                .catch((error) => {
                    console.error('%cError:', 'color:red', error);
                });
            Swal.fire({
                heightAuto: false,
                title: 'Registration successful',
                text: `Data has been sent to our database`,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#211f2c'
            });


        } catch (error) {
            if (error instanceof yup.ValidationError) {
                console.error('%cValidation error:', 'color:red', error.message);
            } else {
                console.error('%cError:', 'color:red', error);
            }
        }
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 1792) {
                setScreenSize('medium');
                setIsButtonAppended(true);
            } else {
                setScreenSize('large');
                setIsButtonAppended(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='form-overlay position-fixed top-0 start-0 w-100 h-100 z-1 d-flex align-items-center justify-content-center'>
            <div className='form-popup w-50 rounded-4 px-5 py-3'>
                <div className='form-popup__header position-relative'>
                    <span className={['medium'].includes(screenSize) ? 'd-none' : 'position-relative d-inline-block ps-4 text-white'}>Digital Archive</span>

                    <button className={['medium'].includes(screenSize) ? 'form-popup__header--close-button position-absolute end-0 top-50 translate-middle-y border border-0 bg-transparent text-white fs-5 pt-4' : 'form-popup__header--close-button position-absolute end-0 top-50 translate-middle-y border border-0 bg-transparent text-white fs-4'} onClick={() => setIsFormOpen(false)}>X</button>

                </div>
                <div className={['medium'].includes(screenSize) ? 'form-popup__body h-100 d-flex flow-row flex-wrap justify-content-center' : 'form-popup__body h-100 d-flex flex-row flex-wrap'}>
                    <div className="form-popup__body--name d-flex flex-column justify-content-center">
                        <span className={['medium'].includes(screenSize) ? 'w-auto text-center mb-2' : 'd-block mb-2'}>{userType.hasOwnProperty('students') ? 'STUDENTS' : 'TEACHERS'}</span>
                        <span className='position-relative d-block fs-5 text-white'>Add New {userType.hasOwnProperty('students') ? 'Student' : 'Teacher'}</span>
                        <button className={['medium'].includes(screenSize) ? 'd-none' : 'form-popup__body--add-button bg-transparent text-white mt-4 px-4 py-1 rounded-pill'} type='submit' form='addFormPopup'>Add</button>
                    </div>
                    <form className='form-popup__body--form d-flex flex-column justify-content-center align-items-center' id='addFormPopup' onSubmit={handleSubmit(onSubmit)}>
                        <div className={['medium'].includes(screenSize) ? 'text-center w-100 mb-4 mt-4' : 'w-100 text-center mb-4'}>

                            <label className={['medium'].includes(screenSize) ? 'label position-relative d-inline-block mb-4' : 'label position-relative d-inline-block me-2'}>
                                <input
                                    {...register('name')}
                                    placeholder=" "
                                    className='bg-transparent text-white'
                                />
                                <span className='position-absolute top-0 start-0 opacity-50'>NAME</span>
                                <p className={errors.name ? 'error error__add position-absolute top-100 start-50 translate-middle-x mt-2 p-1 rounded-3 z-1' : 'd-none'}>{errors.name?.message}</p>
                            </label>
                            <label className={['medium'].includes(screenSize) ? 'label position-relative d-inline-block' : 'label position-relative d-inline-block ms-2'}>
                                <input
                                    {...register('surname')}
                                    placeholder=" "
                                    className='bg-transparent text-white' />
                                <span className='position-absolute top-0 start-0 opacity-50'>SURNAME</span>
                                <p className={errors.surname ? 'error error__add position-absolute top-100 start-50 translate-middle-x mt-2 p-1 rounded-3 z-1' : 'd-none'}>  {errors.surname?.message}</p>
                            </label>
                        </div>

                        <label className='label position-relative d-inline-block mb-4'>
                            <input {...register('birthdate')}
                                placeholder=" "
                                className='bg-transparent text-white' />
                            <span className='position-absolute top-0 start-0 opacity-50'>BIRTHDATE</span>
                            <p className={errors.birthdate ? 'error error__add position-absolute top-100 start-50 translate-middle-x mt-2 p-1 rounded-3 z-1' : 'd-none'}>  {errors.birthdate?.message}</p>
                        </label>

                        <label className='label position-relative d-inline-block'>
                            <input {...register('town')}
                                placeholder=" "
                                className='bg-transparent text-white' />
                            <span className='position-absolute top-0 start-0 opacity-50'>TOWN</span>
                            <p className={errors.town ? 'error error__add position-absolute top-100 start-50 translate-middle-x mt-2 p-1 rounded-3 z-1' : 'd-none'}>  {errors.town?.message}</p>
                        </label>

                        {userType.hasOwnProperty('students') || userType.hasOwnProperty('teachers') ? (
                            <>
                                <label className={['medium'].includes(screenSize) ? 'select-input position-relative d-block mt-4 mb-4' : 'select-input position-relative d-block mt-5 mb-4'}>
                                    <select {...register(userType.hasOwnProperty('students') ? 'program' : 'subject')}
                                        className="select-input__select bg-transparent text-white" required>
                                        <option value="" disabled selected hidden></option>
                                        <option value="JavaScript">JavaScript</option>
                                        <option value="Java">Java</option>
                                        <option value="PHP">PHP</option>
                                        <option value="Python">Python</option>
                                        <option value="Tester">Tester</option>
                                    </select>
                                    <span className='select-input__label position-absolute start-0 end-0 opacity-50'>{userType.hasOwnProperty('students') ? 'PROGRAM' : 'SUBJECT'}</span>
                                </label>
                                <label className='select-input position-relative'>
                                    <select {...register(userType.hasOwnProperty('students') ? 'group' : 'subjectGroup')}
                                        className="select-input__select bg-transparent text-white" required>
                                        <option value="" disabled selected hidden></option>
                                        <option value="1">Group 1</option>
                                        <option value="2">Group 2</option>
                                        <option value="3">Group 3</option>
                                    </select>
                                    <span className='select-input__label position-absolute start-0 end-0 opacity-50'>{userType.hasOwnProperty('students') ? 'GROUP' : 'SUBJECT GROUP'}</span>
                                </label>
                            </>
                        ) : null}
                        {isButtonAppended && <button className='form-popup__body--add-button bg-transparent text-white mt-4 px-4 py-1 rounded-pill' type='submit' form='addFormPopup'>Add</button>}
                    </form >
                </div>
            </div>
        </div>
    );
}

export default FormComponent;