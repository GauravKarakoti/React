import { useFormik } from 'formik';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { sendMessage } from '../../store/actions';
import { showToast } from '../utils/tools';

const Contact = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {email: '', firstname: '', lastname: ''},
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry the email is required')
                .email('This is not a valid email'),
            firstname: Yup.string()
                .required('Sorry the firstname is required'),
            lastname: Yup.string()
                .required('Sorry the lastname is required'),
            message: Yup.string()
                .required('Sorry you have to say something')
                .max(500, 'Sorry the message is too long')
        }),
        onSubmit: (values, {resetForm}) => {
            dispatch(sendMessage(values)).then(({ payload }) => {
                if(payload) {
                    resetForm();
                    showToast('SUCCESS', 'Thank You, We will contact you back');
                } else {
                    showToast('ERROR', 'Sorry Something Happened, Try Again');
                }
            });
        }
    })
    return (
        <>
            <h1>Contact Us</h1>
            <form className='mt-3' onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        className='form-control'
                        name='email'
                        placeholder='email@example.com'
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email
                        ? <Alert variant='danger'>
                            {formik.errors.email}
                        </Alert>
                        : null
                    }
                </div>
                <div className='form-group'>
                    <label htmlFor='firstname'>First Name</label>
                    <input
                        type='text'
                        className='form-control'
                        name='firstname'
                        placeholder='Enter your first name'
                        {...formik.getFieldProps('firstname')}
                    />
                    {formik.errors.firstname && formik.touched.firstname
                        ? <Alert variant='danger'>
                            {formik.errors.firstname}
                        </Alert>
                        : null
                    }
                </div>
                <div className='form-group'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input
                        type='text'
                        className='form-control'
                        name='lastname'
                        placeholder='Enter your last name'
                        {...formik.getFieldProps('lastname')}
                    />
                    {formik.errors.lastname && formik.touched.lastname
                        ? <Alert variant='danger'>
                            {formik.errors.lastname}
                        </Alert>
                        : null
                    }
                </div>
                <div className='form-group'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                        className='form-control'
                        name='message'
                        rows="3"
                        {...formik.getFieldProps('message')}
                    ></textarea>
                    {formik.errors.message && formik.touched.message
                        ? <Alert variant='danger'>
                            {formik.errors.message}
                        </Alert>
                        : null
                    }
                </div>
                <button type='submit' className='btn btn-primary mb-2'>
                    Send Message
                </button>
            </form>
        </>
    )
}
export default Contact;