import { Container, Typography } from '@mui/material';
import { FC, useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { AppForm } from '../components/Form';
import { AppTextField } from '../components/Form/TextField';
import { useApiAxios } from '../hooks/useAxios';
import { checkIsUrl } from '../util/check';

type FormValues = {
  url: string;
};
type CreateShortUrlBody = FormValues;
type CreateShortUrlResponse = {
  token: string;
};

export const CreateShortUrl: FC = () => {
  const [{ loading, error, data }, createShortUrl] = useApiAxios<
    CreateShortUrlResponse,
    CreateShortUrlBody,
    { message: string }
  >({ url: '/', method: 'POST' }, { manual: true });
  const errorData = error?.response?.data;
  const isUrlError = errorData?.message.toLowerCase().includes('url');

  const shortLink = data
    ? `${import.meta.env.VITE_SHORT_LINK_DOMAIN}/${data.token}`
    : undefined;

  const handleSubmit = useCallback<SubmitHandler<FormValues>>(
    async (values) => {
      try {
        await createShortUrl({ data: values });
      } catch {
        // skip
      }
    },
    [createShortUrl]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <AppForm<FormValues> onSubmit={handleSubmit}>
        <AppTextField<FormValues>
          autoFocus
          name="url"
          label="URL"
          error={isUrlError}
          helperText={errorData?.message}
          disabled={loading}
          registerOptions={{
            required: { value: true, message: 'Required' },
            validate: (maybeUrl) =>
              maybeUrl
                ? checkIsUrl(maybeUrl)
                  ? undefined
                  : 'Invalid URL'
                : undefined,
          }}
        />
      </AppForm>
      {shortLink ? (
        <Typography variant="body1">
          Short-Link is{' '}
          <Typography
            component={'a'}
            variant="body1"
            target="_blank"
            href={shortLink}
          >
            {shortLink}
          </Typography>
        </Typography>
      ) : undefined}
    </Container>
  );
};
