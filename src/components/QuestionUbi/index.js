import React, { useState } from 'react';
import { SectionInner } from '../Layout/Sections';
import s from './style.module.less';
import cN from 'classnames';
import { Speechbubble } from './Speechbubble';
import { Form, Field } from 'react-final-form';
import { CTAButton } from '../Layout/CTAButton';
import Avatar1 from './avatar1.svg';
import { TextInputWrapped } from '../Forms/TextInput';

export default ({ mode }) => {
  return (
    <Form
      onSubmit={data => {
        console.log('submitting', data);
      }}
      validate={validate}
      render={({ handleSubmit, dirtyFields, ...props }) => (
        <SectionInner>
          <form onSubmit={handleSubmit}>
            <Speechbubble>
              <Field
                name="message"
                label="Deine Frage an das Grundeinkommen"
                placeholder="Deine Nachricht"
                type="textarea"
                maxLength={400}
                component={TextInputWrapped}
                inputClassName={s.questionInput}
                hideLabel={true}
              />
            </Speechbubble>
            <div className={s.belowBubble}>
              <Field name="image" component={ImageInput} />
              <Field
                render={TextInputWrapped}
                name="name"
                label="Name"
                placeholder="Dein Name"
                inputClassName={s.nameInput}
              />
              <div className={s.submitButtonContainer}>
                <CTAButton
                  type="submit"
                  className={cN(s.submitButton, {
                    [s.submitButtonDirty]: dirtyFields.message,
                  })}
                >
                  Abschicken
                </CTAButton>
              </div>
            </div>
          </form>
        </SectionInner>
      )}
    ></Form>
  );
};

const ImageInput = ({ input: { value, onChange, ...input } }) => {
  const [avatarImage, setAvatarImage] = useState(null);
  const handleChange = ({ target }) => {
    onChange(target.files);
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = e => {
        setAvatarImage(e.target.result);
      };
    }
  };
  return (
    <label className={s.avatarImageContainer} aria-label="Lade ein Bild hoch">
      <img src={avatarImage || Avatar1} className={s.avatarImage} />
      <input
        type="file"
        onChange={handleChange}
        className={s.avatarUploadButton}
        {...input}
      />
    </label>
  );
};

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Bitte gib einen Namen an';
  }

  return errors;
};
