import { userActions } from 'entities/User';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchNextArticleListArticlesPage } from './fetchNextArticleListArticlesPage';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';
import { fetchArticleList } from '../fetchArticleList/fetchArticleList';

jest.mock('../fetchArticleList/fetchArticleList')

describe('fetchProfileData.test', () => {
	test('success', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticleListArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: true
			}
		});

		await thunk.callThunk();
		expect(thunk.dispatch).toBeCalledTimes(4)
		expect(fetchArticleList).toHaveBeenCalled()
	});
	test('no more pages', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticleListArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: false
			}
		});

		await thunk.callThunk();
		// 2 раза: pending при запуске, а потом fulfilled
		expect(thunk.dispatch).toBeCalledTimes(2)
		expect(fetchArticleList).not.toHaveBeenCalled()
	});
});
