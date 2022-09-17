import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Box } from 'components/Box';
import { Audio } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import {
  useEditContactMutation,
  useGetContactByIdQuery,
} from 'services/contactsApi';
import { toast } from 'react-toastify';
import {
  EditFormWrapper,
  EditForm,
  Input,
  LoaderContainer,
  SubmitBtn,
  Label,
  CloseBtn,
} from './EditContact.styled';

export const EditContact = ({ id, closeModal }) => {
  const { data, isLoading } = useGetContactByIdQuery(id);
  const [editContact, { isLoading: isEditLoading, isSuccess, isError }] =
    useEditContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = formData => {
    editContact({ ...data, ...formData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Contact edited');
      closeModal();
    }

    if (isError) {
      toast.error('Oops!! Something went wrong!');
    }
  }, [closeModal, isError, isSuccess]);

  return (
    <EditFormWrapper>
      <CloseBtn onClick={closeModal} />
      {isLoading || isEditLoading ? (
        <LoaderContainer>
          <Audio />
        </LoaderContainer>
      ) : (
        <EditForm onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <h2>Edit contact</h2>
          <Label>
            <Box mb={2}>Name</Box>
            <Input
              defaultValue={data?.name}
              {...register('name', {
                required: { value: true, message: 'This field is required' },
                pattern: {
                  value:
                    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/g,
                  message:
                    "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
                },
              })}
            />
            {errors.name && (
              <div style={{ color: '#cb0f0f' }}>{errors.name?.message}</div>
            )}
          </Label>

          <Label>
            <Box mb={2}>Number</Box>
            <Input
              defaultValue={data?.number}
              {...register('number', {
                required: { value: true, message: 'This field is required' },
                pattern: {
                  value:
                    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,
                  message:
                    'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
                },
              })}
            />
            {errors.number && (
              <div style={{ color: '#cb0f0f' }}>{errors.name?.message}</div>
            )}
          </Label>

          <SubmitBtn type="submit">Submit</SubmitBtn>
        </EditForm>
      )}
    </EditFormWrapper>
  );
};

EditContact.propType = {
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
