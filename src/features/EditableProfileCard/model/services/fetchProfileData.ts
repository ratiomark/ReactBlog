import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../types/profile'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const fetchProfileData = createAsyncThunk<Profile, string, { rejectValue: string, extra: ThunkExtraArg }>(
	'profile/fetchProfileData',
	async (profileId, thunkAPI) => {

		try {
			const response = await thunkAPI.extra.api!.get<Profile>('/profile/' + profileId)

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