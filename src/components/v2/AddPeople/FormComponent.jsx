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
        console.log('Form data:', sendData);

        try {
            await userSchema.validate(sendData);
            console.info('Validation passed');

            fetch(`https://api-for-mern-app.onrender.com/api/v2/students`, {
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
                    console.info('Success:', data);
                    setIsRendering(prevState => !prevState)

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            Swal.fire({
                title: 'Registration successful',
                text: `Data has been sent to our database`,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#211f2c',
            });


        } catch (error) {
            if (error instanceof yup.ValidationError) {
                console.error('Validation error:', error.message);
            } else {
                console.error('Error:', error);
            }
        }
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 1668) {
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
        <div className='form-overlay'>
            <div className='form-popup rounded-4 px-5 py-3'>
                <div className='form-popup__header'>
                    <span className={screenSize === 'medium' ? 'd-none' : 'ps-4'}>Digital Archive</span>

                    <button className={screenSize === 'medium' ? 'form-popup__header--close-button fs-5 pt-4' : 'form-popup__header--close-button fs-4'} onClick={() => setIsFormOpen(false)}>X</button>

                </div>
                <div className={screenSize === 'medium' ? 'form-popup__body justify-content-center' : 'form-popup__body'}>
                    <div className="form-popup__body--name">
                        <span className={screenSize === 'medium' ? 'w-auto text-center mb-2' : 'd-block mb-2'}>STUDENTS</span>
                        <span className='d-block fs-5'>Add New Student</span>
                        <button className={screenSize === 'medium' ? 'd-none' : 'form-popup__body--add-button mt-4 px-4 py-1 rounded-pill'} type='submit' form='addFormPopup'>Add</button>
                    </div>
                    <form className='form-popup__body--form' id='addFormPopup' onSubmit={handleSubmit(onSubmit)}>
                        <div className={screenSize === 'medium' ? 'text-center w-100 mb-4' : 'w-100 text-center mb-4'}>

                            <label className={screenSize === 'medium' ? 'label mb-4' : 'label me-2'}>
                                <input
                                    {...register('name')}
                                    placeholder=" "
                                />
                                <span>NAME</span>
                                <p className={errors.name ? 'error-message p-1' : 'd-none'}>{errors.name?.message}</p>
                            </label>
                            <label className={screenSize === 'medium' ? 'label' : 'label ms-2'}>
                                <input
                                    {...register('surname')}
                                    placeholder=" " />
                                <span>SURNAME</span>
                                <p className={errors.surname ? 'error-message p-1' : 'd-none'}>  {errors.surname?.message}</p>
                            </label>
                        </div>

                        <label className='label mb-4'>
                            <input {...register('birthdate')}
                                placeholder=" " />
                            <span>BIRTHDATE</span>
                            <p className={errors.birthdate ? 'error-message p-1' : 'd-none'}>  {errors.birthdate?.message}</p>
                        </label>

                        <label className='label'>
                            <input {...register('town')}
                                placeholder=" " />
                            <span>TOWN</span>
                            <p className={errors.town ? 'error-message p-1' : 'd-none'}>  {errors.town?.message}</p>
                        </label>

                        {userType.hasOwnProperty('students') ? (
                            <>
                                <label className={screenSize === 'medium' ? 'select-input mt-4 mb-4' : 'select-input mt-5 mb-4'}>
                                    <select {...register('program')}
                                        className="select-input__select" required>
                                        <option value="" disabled selected hidden></option>
                                        <option value="JavaScript">JavaScript</option>
                                        <option value="Java">Java</option>
                                        <option value="PHP">PHP</option>
                                        <option value="Python">Python</option>
                                        <option value="Tester">Tester</option>
                                    </select>
                                    <span className='select-input__label'>PROGRAM</span>
                                    <p className={errors.program ? 'error-message p-1' : 'd-none'}>  {errors.program?.message}</p>
                                </label>
                                <label className='select-input'>
                                    <select {...register('group')}
                                        className="select-input__select" required>
                                        <option value="" disabled selected hidden></option>
                                        <option value="1">Group 1</option>
                                        <option value="2">Group 2</option>
                                        <option value="3">Group 3</option>
                                    </select>
                                    <span className='select-input__label'>GROUP</span>
                                    <p className={errors.group ? 'error-message p-1' : 'd-none'}>  {errors.group?.message}</p>
                                </label>
                            </>
                        ) :
                            userType.hasOwnProperty('teachers') ? (
                                <>
                                    <label className='select-input'>
                                        <select {...register('subject')}
                                            className="select-input__select" required>
                                            <option value="" disabled selected hidden></option>
                                            <option value="JavaScript">JavaScript</option>
                                            <option value="Java">Java</option>
                                            <option value="PHP">PHP</option>
                                            <option value="Python">Python</option>
                                            <option value="Tester">Tester</option>
                                        </select>
                                        <span className='select-input__label'>SUBJECT</span>
                                    </label>
                                    <label className='select-input'>
                                        <select {...register('subjectGroup')}
                                            className="select-input__select" required>
                                            <option value="" disabled selected hidden></option>
                                            <option value="1">Group 1</option>
                                            <option value="2">Group 2</option>
                                            <option value="3">Group 3</option>
                                        </select>
                                        <span className='select-input__label'>SUBJECT GROUP</span>
                                    </label>
                                </>
                            ) :
                                null}
                        {isButtonAppended && <button className='form-popup__body--add-button mt-4 px-4 py-1 rounded-pill' type='submit' form='addFormPopup'>Add</button>}
                    </form >
                </div>
            </div>
        </div>
    );
}

export default FormComponent;