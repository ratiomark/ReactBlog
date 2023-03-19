import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getProfileForm } from '../selectors/getProfileForm'
import { Profile } from '../types/profile'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const updateProfileData = createAsyncThunk<Profile, void, { rejectValue: string, state: StateSchema, extra: ThunkExtraArg }>(
	'profile/updateProfileData',
	async (_, thunkAPI) => {
		// const { readonly } = 
			
		const formData = getProfileForm(thunkAPI.getState())
		try {
			const response = await thunkAPI.extra.api!.put<Profile>('/profile', formData)
			if (!response.data) {
				throw new Error()
			}

			const responseData = response.data

			return responseData

		} catch (err) {
			return thunkAPI.rejectWithValue(i18n.t('error on login'))
		}
	}
)