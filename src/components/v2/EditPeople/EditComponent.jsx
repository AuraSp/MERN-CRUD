import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { MdClose, MdCheck } from "react-icons/md";
import './EditInfo.css';
import '../Shared/@Media/@Media.css';


function EditComponent({ data, onCancelEdit, onSubmitEdit, userType, screenSize}) {
    const [combinedValues, setCombinedValues] = useState(`${data.name} ${data.surname}`);
    const [birthdate, setBirthdate] = useState(data.birthdate);
    const [town, setTown] = useState(data.town);
    const [program, setProgram] = useState(data.program);
    const [group, setGroup] = useState(data.group);
    const [subject, setSubject] = useState(data.subject);
    const [subjectGroup, setSubjectGroup] = useState(data.subjectGroup);


    const userSchema = yup.object().shape({
        combinedValues: yup
            .string()
            .nullable(false)
            .matches(/^\b[^\d\s]{3,}\b \b[^\d\s]{3,}\b$/, { message: 'Please enter both first and last names with at least 3 characters each' })
            .required('Both name and surname are required'),
        birthdate: yup
            .date()
            .nullable(false)
            .min(new Date(1950, 1, 1), 'Date cannot be before 1950')
            .max(new Date(), 'Date cannot be in the future')
            .typeError('Birthdate must be a valid date')
            .required('Birthdate is required'),
        town: yup
            .string()
            .nullable(false)
            .matches(/^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž][a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž\s'-]*[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž]$/, { message: 'Only letters are allowed and no blank' })
            .required('Town is required')
            .strict(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }, } = useForm({
            resolver: yupResolver(userSchema)
        });

    const onSaveEdit = handleSubmit(async (updatedData) => {

        try {

            await userSchema.validate(updatedData, { abortEarly: true });

            const [firstname, lastname] = combinedValues.split(' ').map((item) => item.trim());

            let updatedObj = {
                name: firstname,
                surname: lastname,
                birthdate: updatedData.birthdate,
                town: updatedData.town,
                program: updatedData.program,
                group: updatedData.group,
                subject: updatedData.subject,
                subjectGroup: updatedData.subjectGroup
            }

            onSubmitEdit(data._id, updatedObj);
            onCancelEdit();

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                console.error('%cValidation error:', 'color:red', error.message);
            } else {
                console.error('%cError:', 'color:red', error);
            }
        }
    })

    return !['small', 'medium'].includes(screenSize) ? (
        <tr className='edit-rows__large d-block w-100 text-center py-3 position-relative'>
            <td className='edit-rows__column'>
                <button className='editbutton position-relative border-0 align-middle me-2'
                    onClick={(e) => onCancelEdit(e)} ><MdClose style={{ top: '50%', left: '50%', transform: 'translate(-100%, -50%)' }} className='position-absolute bg-danger rounded-circle text-white fs-3 p-1' /></button>
                <button className='editbutton position-relative align-middle border-0 ms-2'
                    onClick={onSaveEdit} ><MdCheck style={{ top: '50%', right: '50%', transform: 'translate(100%, -50%)' }} className='position-absolute rounded-circle text-white fs-3 p-1' /></button>
            </td >


            <td>
                <input
                    type="text"
                    {...register('combinedValues')}
                    value={combinedValues}
                    onChange={(e) => setCombinedValues(e.target.value)}
                    className='border-0 text-center rounded-2 w-auto lh-base align-middle fw-medium'
                />
                <p className={errors.combinedValues ? 'error error__edit position-absolute mt-2 p-1 rounded-3 z-1' : 'd-none'}>{errors.combinedValues?.message}</p>
            </td>
            <td>
                <input
                    type='text'
                    {...register('birthdate')}
                    value={birthdate.slice(0, 10)}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className='border-0 text-center rounded-2 w-75 lh-base align-middle fw-medium'
                />
                <p className={errors.birthdate ? 'error error__edit position-absolute mt-2 p-1 rounded-3 z-1' : 'd-none'}> {errors.birthdate?.message}</p>
            </td>
            <td>
                <input
                    type='text'
                    {...register('town')}
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className='border-0 text-center rounded-2 w-75 lh-base align-middle fw-medium'
                />
                <p className={errors.town ? 'error error__edit position-absolute mt-2 p-1 rounded-3 z-1' : 'd-none'}> {errors.town?.message}</p>
            </td>

            {userType.hasOwnProperty('students') ? (
                <>
                    <td>
                        <select
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            className='border-0 text-center rounded-2 w-50 bg-white align-middle fw-medium'
                        >
                            <option value="JavaScript">JavaScript</option>
                            <option value="Java">Java</option>
                            <option value="PHP">PHP</option>
                            <option value="Python">Python</option>
                            <option value="Tester">Tester</option>
                        </select>
                    </td>
                    <td>
                        <select
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className='border-0 text-center rounded-2 w-75 bg-white align-middle fw-medium'
                        >
                            <option value="1">Group 1</option>
                            <option value="2">Group 2</option>
                            <option value="3">Group 3</option>
                        </select>
                    </td>
                </>
            ) : (
                <>
                    <td>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className='border-0 text-center rounded-2 w-50 bg-white align-middle fw-medium'
                        >
                            <option value="JavaScript">JavaScript</option>
                            <option value="Java">Java</option>
                            <option value="PHP">PHP</option>
                            <option value="Python">Python</option>
                            <option value="Tester">Tester</option>
                        </select>
                    </td>
                    <td>
                        <select
                            value={subjectGroup}
                            onChange={(e) => setSubjectGroup(e.target.value)}
                            className='border-0 text-center rounded-2 w-75 bg-white align-middle fw-medium'
                        >
                            <option value="1">Group 1</option>
                            <option value="2">Group 2</option>
                            <option value="3">Group 3</option>
                        </select>
                    </td>
                </>
            )}
        </tr >
    ) : (
        <tr className='edit-rows__small w-100 position-relative my-4 py-3 px-3 rounded-5 d-flex flex-row flex-wrap text-start text-white border-3 border-0'>
            <td className='edit-rows__column text-center position-relative'>
                <button className='editbutton position-relative border-0 align-middle me-2'
                    onClick={(e) => onCancelEdit(e)} ><MdClose style={{ top: '50%', right: '0%' }} className='position-absolute bg-danger rounded-circle text-white fs-2 p-1' /></button>
                <button className='editbutton position-relative align-middle border-0 ms-2'
                    onClick={onSaveEdit} ><MdCheck style={{ top: '50%', left: '0%' }} className='position-absolute bg-dark rounded-circle text-white fs-2 p-1' /></button>
            </td >


            <td data-name='Name, Surname' className='mb-3 position-relative'>
                <input
                    type="text"
                    {...register('combinedValues')}
                    value={combinedValues}
                    onChange={(e) => setCombinedValues(e.target.value)}
                    className='border-0 bg-transparent w-100 fw-medium text-light align-top'
                />
                <p className={errors.combinedValues ? 'error error__edit position-absolute mt-2 p-1 rounded-3 z-1' : 'd-none'}>{errors.combinedValues?.message}</p>
            </td>
            <td data-name='Birthdate' className='mb-3 position-relative'>
                <input
                    type='text'
                    {...register('birthdate')}
                    value={birthdate.slice(0, 10)}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className='border-0 bg-transparent w-100 fw-medium text-light align-top'
                />
                <p className={errors.birthdate ? 'error error__edit position-absolute mt-2 p-1 rounded-3 z-1' : 'd-none'}> {errors.birthdate?.message}</p>
            </td>
            <td data-name='Town' className='mb-3 position-relative'>
                <input
                    type='text'
                    {...register('town')}
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className='border-0 bg-transparent w-100 fw-medium text-light align-top'
                />
                <p className={errors.town ? 'error error__edit position-absolute mt-2 p-1 rounded-3 z-1' : 'd-none'}> {errors.town?.message}</p>


            </td>

            {userType.hasOwnProperty('students') ? (
                <>
                    <td data-name='Program' className='mb-3'>
                        <select
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            className='border-0 bg-transparent text-center w-100 fw-medium text-light align-middle'
                        >
                            <option value="JavaScript">JavaScript</option>
                            <option value="Java">Java</option>
                            <option value="PHP">PHP</option>
                            <option value="Python">Python</option>
                            <option value="Tester">Tester</option>
                        </select>
                    </td>
                    <td data-name='Group' className='mb-3'>
                        <select
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className='border-0 bg-transparent text-center w-100 fw-medium text-light align-middle'
                        >
                            <option value="1">Group 1</option>
                            <option value="2">Group 2</option>
                            <option value="3">Group 3</option>
                        </select>
                    </td>
                </>
            ) : (
                <>
                    <td data-name='Subject' className='mb-3'>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className='border-0 bg-transparent text-center w-100 fw-medium text-light align-middle'
                        >
                            <option value="JavaScript">JavaScript</option>
                            <option value="Java">Java</option>
                            <option value="PHP">PHP</option>
                            <option value="Python">Python</option>
                            <option value="Tester">Tester</option>
                        </select>
                    </td>
                    <td data-name='Sub. Group' className='mb-3'>
                        <select
                            value={subjectGroup}
                            onChange={(e) => setSubjectGroup(e.target.value)}
                            className='border-0 bg-transparent text-center w-100 fw-medium text-light align-middle'
                        >
                            <option value="1">Group 1</option>
                            <option value="2">Group 2</option>
                            <option value="3">Group 3</option>
                        </select>
                    </td>
                </>
            )}
        </tr >
    );
}

export default EditComponent;
