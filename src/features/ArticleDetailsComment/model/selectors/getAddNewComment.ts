import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store/buildSelector';

export const [useAddNewCommentText, getAddNewCommentText] = buildSelector(
	(state: StateSchema) => state.addNewComment?.text ?? ''
)
export const [useAddNewCommentError, getAddNewCommentError] = buildSelector(
	(state: StateSchema) => state.addNewComment?.error
)

// export const getAddNewCommentText = (state: StateSchema) => state.addNewComment?.text ?? ''
// export const getAddNewCommentError = (state: StateSchema) => state.addNewComment?.error
// Я не хочу сказать, что ты душный, но если бы ты был городом, то это был бы Душанбе. Шутка, с долей правды. Это мое субъективное ощущение, которые было в течении проверки этой ПР. Вполне возможно, это не проблема с твоей стороны, а просто мой загон, но если уже я даю обратную обратную связь, то говорю правду. Нет намерений обидеть, просто делюсь ощущениями
// Если говорить серьезно, то мне не хватало объяснений и примеров. Создавалось ощущение, что мне приходится вытягивать объяснение где именно и что именно нужно исправить. Возможно это я сильно тупил, хз. Больше объяснений и примеров это всегда хорошо.
// В любом случае спасибо за советы, некоторые штуки были действительно полезными, благодарю. 