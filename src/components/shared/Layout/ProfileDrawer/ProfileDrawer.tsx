'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  Chip,
  Avatar,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


import { styles } from './ProfileDrawer.styles';
import { EditProfileFormValues, editProfileSchema } from '@/types/User';
import { editProfile, getUserById } from '@/lib/api/user';
import { useGlobalStore } from '@/store/globalStore';
import { LogoutButton } from '../../LogoutButton';
import { ImageUploader } from '../../ImageUploader';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ProfileDrawer = ({ open, onClose }: Props) => {
  const user = useGlobalStore(state => state.user);
  const setUser = useGlobalStore(state => state.setUser);
  const setError = useGlobalStore(state => state.setError);
  const setSuccess = useGlobalStore(state => state.setSuccess);

  const [mode, setMode] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      avatar: user?.avatar,
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    if (!user) return;

    try {
      await editProfile(user.id, { ...data, role: user.role });
      const fresh = await getUserById(user.id);
      setUser(fresh);
      reset({
        name: fresh.name,
        email: fresh.email,
        avatar: fresh.avatar,
      });
      setMode(false);
      setSuccess('Profile succesfully updated!');
    } catch (err) {
      console.log(err);
      setError('Unable to updated the profile');
    }
  };

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  }, [user, reset]);

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography variant='h6' sx={styles.title}>
            Profile
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {mode ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={styles.userForm}>
              <Controller
                name='avatar'
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value ? [field.value] : []}
                    onChange={val => field.onChange(val[0] || '')}
                  />
                )}
              />

              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Name'
                    fullWidth
                    margin='normal'
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Email'
                    fullWidth
                    margin='normal'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Box>

            <Divider />

            <Box sx={styles.actionsWrapper}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                disabled={isSubmitting}
              >
                Save
              </Button>

              <Button
                variant='outlined'
                fullWidth
                onClick={() => setMode(false)}
              >
                Cancel
              </Button>
            </Box>
          </form>
        ) : (
          <>
            <Box sx={styles.userInfo}>
              <Avatar
                src={user?.avatar || '/weather/fog.png'}
                alt={user?.name || 'User avatar'}
                sx={styles.avatar}
              />
              <Typography variant='h6'>{user?.name}</Typography>
              <Typography variant='body2' sx={styles.detailsText}>
                {user?.email}
              </Typography>
            </Box>

            <Divider />

            <Box sx={styles.actionsWrapper}>
              <Button
                variant='outlined'
                fullWidth
                onClick={() => setMode(true)}
              >
                Edit Profile
              </Button>
              <LogoutButton />
            </Box>

            <Divider />

            <Box sx={styles.accountDetailsBox}>
              <Typography variant='subtitle1'>Account details</Typography>

              <Box sx={styles.detailsTextBox}>
                <Typography variant='body2' sx={styles.detailsText}>
                  Role:
                </Typography>
                <Chip
                  size='small'
                  color={user?.role === 'admin' ? 'secondary' : 'primary'}
                  label={user?.role}
                />
              </Box>

              <Box sx={styles.detailsTextBox}>
                <Typography variant='body2' sx={styles.detailsText}>
                  ID:
                </Typography>
                <Chip size='small' variant='outlined' label={user?.id} />
              </Box>

              <Box sx={styles.detailsTextBox}>
                <Typography variant='body2' sx={styles.detailsText}>
                  Member since:
                </Typography>
                <Typography variant='body2'>
                  {dayjs(user?.creationAt).format('D MMM YYYY')}
                </Typography>
              </Box>

              <Box sx={styles.detailsTextBox}>
                <Typography variant='body2' sx={styles.detailsText}>
                  Last update:
                </Typography>
                <Typography variant='body2'>
                  {dayjs(user?.updatedAt).format('D MMM YYYY')}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};
