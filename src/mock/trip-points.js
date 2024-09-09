const MOCK_TRIP_POINTS = [
  {
    'id': '2956dc67-1c8b-48ea-a2f2-cb8db7ad65e0',
    'base_price': 1473,
    'date_from': '2024-08-25T17:48:09.936Z',
    'date_to': '2024-08-26T08:39:09.936Z',
    'destination': '75ae5832-8468-4c17-b2b6-1eec4dbeae36',
    'is_favorite': false,
    'offers': [
      'dca55199-afd4-4ae7-87c6-d47826ee1d73',
      'c5b65695-7818-47e0-bd47-c52edb15d383'
    ],
    'type': 'restaurant'
  },
  {
    'id': '382306f5-4618-4a8c-94e4-42bf4cbb01f2',
    'base_price': 230,
    'date_from': '2024-08-27T17:02:09.936Z',
    'date_to': '2024-08-29T08:41:09.936Z',
    'destination': '1bdc7e0a-17d6-411e-8ed9-ba413fd7860a',
    'is_favorite': true,
    'offers': [
      '06e49025-cb13-40f1-b908-d407e40e7a03',
      '1eca0013-44d6-4f60-913b-be3cc92a451f',
      '83f3d48c-cb3f-44e5-80b4-a674920ba8c6',
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': '3ea6ea86-10d1-4af2-a017-7bf03f21723b',
    'base_price': 5984,
    'date_from': '2024-08-29T21:26:09.936Z',
    'date_to': '2024-08-30T19:54:09.936Z',
    'destination': '9aa8c921-d6b9-459b-8604-03c18f7dfc28',
    'is_favorite': true,
    'offers': [
      'e24d9ced-27d8-4af9-b424-319b350df937',
      '6a4657b0-e00d-4aef-85c8-eaf1889297f7',
      'c892c024-89b9-41f8-bfbc-9f16eeff7aab',
      'efac3f93-f9f4-4b11-becf-c81924e79e41',
      '70c534d5-5f42-4973-a5b2-0f8330c04ba8'
    ],
    'type': 'flight'
  },
  {
    'id': 'eaa16fb5-1ebc-49ac-b8f9-eb60256c0330',
    'base_price': 2235,
    'date_from': '2024-08-31T12:57:09.936Z',
    'date_to': '2024-08-31T23:50:09.936Z',
    'destination': 'a7f070d6-1b56-4c9b-975f-61078a860de1',
    'is_favorite': true,
    'offers': [
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': '1f40e2ce-d047-404e-9804-9e872f2197f5',
    'base_price': 1556,
    'date_from': '2024-09-02T14:05:09.936Z',
    'date_to': '2024-09-04T03:49:09.936Z',
    'destination': '55666483-8a52-42fb-adc3-c68bdcfecd0f',
    'is_favorite': true,
    'offers': [
      'c5b65695-7818-47e0-bd47-c52edb15d383'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'ed15fd7f-70ef-40f5-b785-e599783d99b4',
    'base_price': 2799,
    'date_from': '2024-09-05T01:38:09.936Z',
    'date_to': '2024-09-07T02:00:09.936Z',
    'destination': 'e2225dee-32a6-4ede-865b-d42f35aa30a2',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '12f88003-a412-455c-ad1a-30225277955a',
    'base_price': 3255,
    'date_from': '2024-09-08T23:40:09.936Z',
    'date_to': '2024-09-10T12:19:09.936Z',
    'destination': '55666483-8a52-42fb-adc3-c68bdcfecd0f',
    'is_favorite': true,
    'offers': [
      '0359f6f0-9ec1-4be7-8edf-e731b233c3f1'
    ],
    'type': 'train'
  },
  {
    'id': '2ac657d8-3ae5-4bb9-8a25-cd3a93212b56',
    'base_price': 6641,
    'date_from': '2024-09-10T20:59:09.936Z',
    'date_to': '2024-09-12T19:00:09.936Z',
    'destination': '0a26a247-2fc5-45fb-a874-ed85317e3053',
    'is_favorite': true,
    'offers': [
      '85602e4e-f4c8-4e9b-b049-303c30e2fd55',
      '2e962c34-b507-45ff-b435-853c760699c0',
      'ab581f38-7a20-4c3a-83cf-2b7a79c2c538'
    ],
    'type': 'bus'
  },
  {
    'id': 'c2d15118-362f-4aaa-a1ee-1254e506b7e6',
    'base_price': 2896,
    'date_from': '2024-09-14T12:12:09.936Z',
    'date_to': '2024-09-16T03:05:09.936Z',
    'destination': 'e75d5a88-4377-406a-baf8-866561a7f580',
    'is_favorite': true,
    'offers': [],
    'type': 'taxi'
  },
  {
    'id': '7bf58e55-a277-4bd1-ab68-732928127b25',
    'base_price': 6658,
    'date_from': '2024-09-17T13:37:09.936Z',
    'date_to': '2024-09-17T22:01:09.936Z',
    'destination': 'f81cb09d-8504-4e61-99ea-5e2169a418d3',
    'is_favorite': true,
    'offers': [
      '85602e4e-f4c8-4e9b-b049-303c30e2fd55',
      '2e962c34-b507-45ff-b435-853c760699c0',
      'ab581f38-7a20-4c3a-83cf-2b7a79c2c538'
    ],
    'type': 'bus'
  },
  {
    'id': '1f2316a2-cc93-4dbb-a65c-7b9edc709185',
    'base_price': 1629,
    'date_from': '2024-09-18T21:17:09.936Z',
    'date_to': '2024-09-20T01:20:09.936Z',
    'destination': 'e2225dee-32a6-4ede-865b-d42f35aa30a2',
    'is_favorite': true,
    'offers': [
      '9afaec64-fda7-4e90-ab77-d03281cf1fe3',
      '713c26fb-1371-4fc7-9052-346633947f6d'
    ],
    'type': 'taxi'
  },
  {
    'id': '7fad1610-e7b7-468a-bfeb-9d615a4373f7',
    'base_price': 1498,
    'date_from': '2024-09-21T18:11:09.936Z',
    'date_to': '2024-09-22T03:31:09.936Z',
    'destination': 'f81cb09d-8504-4e61-99ea-5e2169a418d3',
    'is_favorite': true,
    'offers': [
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': 'a1426e14-0e76-4377-80d1-f809700c697e',
    'base_price': 1102,
    'date_from': '2024-09-23T14:38:09.936Z',
    'date_to': '2024-09-23T21:30:09.936Z',
    'destination': '0a26a247-2fc5-45fb-a874-ed85317e3053',
    'is_favorite': true,
    'offers': [
      '41de9a8d-9e00-4ec1-b4ba-327841c21df7',
      '75db0a2b-75d3-4f38-ac08-7a77058182b8',
      '8223d0e3-7121-4287-aef2-f3600dd6961c',
      'f2664b0c-3574-446d-9a30-f7c1093f92b7',
      'b3560210-a2ee-4637-af88-f134eef531bf'
    ],
    'type': 'ship'
  },
  {
    'id': '6b2f506d-7926-4c85-bdc8-248c479c1a14',
    'base_price': 7682,
    'date_from': '2024-09-25T07:02:09.936Z',
    'date_to': '2024-09-25T14:08:09.936Z',
    'destination': '75ae5832-8468-4c17-b2b6-1eec4dbeae36',
    'is_favorite': true,
    'offers': [
      '06e49025-cb13-40f1-b908-d407e40e7a03',
      '1eca0013-44d6-4f60-913b-be3cc92a451f',
      '83f3d48c-cb3f-44e5-80b4-a674920ba8c6',
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': 'e4f365c8-83cc-452f-b5e8-67a12562f9e1',
    'base_price': 1237,
    'date_from': '2024-09-27T04:04:09.936Z',
    'date_to': '2024-09-27T10:29:09.936Z',
    'destination': '75ae5832-8468-4c17-b2b6-1eec4dbeae36',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '2418e5ca-fdf0-4edb-99ac-1a9561abf162',
    'base_price': 3151,
    'date_from': '2024-09-28T08:33:09.936Z',
    'date_to': '2024-09-29T11:56:09.936Z',
    'destination': '9aa8c921-d6b9-459b-8604-03c18f7dfc28',
    'is_favorite': true,
    'offers': [
      '1eca0013-44d6-4f60-913b-be3cc92a451f',
      '83f3d48c-cb3f-44e5-80b4-a674920ba8c6',
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': 'd1ff74db-8687-45f8-a12c-26e6364c4c67',
    'base_price': 7368,
    'date_from': '2024-09-29T22:36:09.936Z',
    'date_to': '2024-10-01T22:02:09.936Z',
    'destination': 'e75d5a88-4377-406a-baf8-866561a7f580',
    'is_favorite': false,
    'offers': [
      'ddc71da3-2662-41b4-88a3-2e4e70810c94',
      'e5f2a8f0-b788-4538-9562-ba819bc5e110',
      '8af68438-bce3-4ff6-9781-9112a1f40915',
      '9afaec64-fda7-4e90-ab77-d03281cf1fe3',
      '713c26fb-1371-4fc7-9052-346633947f6d'
    ],
    'type': 'taxi'
  },
  {
    'id': 'a9d68359-eb77-443a-85b6-0175a402c530',
    'base_price': 5979,
    'date_from': '2024-10-03T13:01:09.936Z',
    'date_to': '2024-10-05T13:38:09.936Z',
    'destination': 'a7f070d6-1b56-4c9b-975f-61078a860de1',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '7832537e-8554-4daf-a932-354ae6982db5',
    'base_price': 9698,
    'date_from': '2024-10-07T00:12:09.936Z',
    'date_to': '2024-10-08T01:59:09.936Z',
    'destination': '9aa8c921-d6b9-459b-8604-03c18f7dfc28',
    'is_favorite': true,
    'offers': [
      '0359f6f0-9ec1-4be7-8edf-e731b233c3f1'
    ],
    'type': 'train'
  },
  {
    'id': '68831e98-843f-4b92-969b-a321a58e362a',
    'base_price': 6783,
    'date_from': '2024-10-09T08:25:09.936Z',
    'date_to': '2024-10-09T21:56:09.936Z',
    'destination': 'e2225dee-32a6-4ede-865b-d42f35aa30a2',
    'is_favorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '40e142d5-fb9e-4cd8-8a1a-51e3c29cd6ea',
    'base_price': 6074,
    'date_from': '2024-10-10T23:53:09.936Z',
    'date_to': '2024-10-12T04:35:09.936Z',
    'destination': '1bdc7e0a-17d6-411e-8ed9-ba413fd7860a',
    'is_favorite': true,
    'offers': [
      'dca55199-afd4-4ae7-87c6-d47826ee1d73',
      'c5b65695-7818-47e0-bd47-c52edb15d383'
    ],
    'type': 'restaurant'
  },
  {
    'id': '5d9137fa-d619-4da7-8a0e-578ee9f4d399',
    'base_price': 4521,
    'date_from': '2024-10-14T00:57:09.936Z',
    'date_to': '2024-10-15T05:36:09.936Z',
    'destination': '1bdc7e0a-17d6-411e-8ed9-ba413fd7860a',
    'is_favorite': false,
    'offers': [
      '9afaec64-fda7-4e90-ab77-d03281cf1fe3',
      '713c26fb-1371-4fc7-9052-346633947f6d'
    ],
    'type': 'taxi'
  },
  {
    'id': '81458cee-f64a-41e9-820c-ea3f5cae82bf',
    'base_price': 2455,
    'date_from': '2024-10-16T07:38:09.936Z',
    'date_to': '2024-10-17T14:19:09.936Z',
    'destination': 'e75d5a88-4377-406a-baf8-866561a7f580',
    'is_favorite': true,
    'offers': [
      '6a4657b0-e00d-4aef-85c8-eaf1889297f7',
      'c892c024-89b9-41f8-bfbc-9f16eeff7aab',
      'efac3f93-f9f4-4b11-becf-c81924e79e41',
      '70c534d5-5f42-4973-a5b2-0f8330c04ba8'
    ],
    'type': 'flight'
  },
  {
    'id': '2e5d26db-e24c-4b9e-8ed6-ed7c8b9f779a',
    'base_price': 102,
    'date_from': '2024-10-18T20:15:09.936Z',
    'date_to': '2024-10-20T18:08:09.936Z',
    'destination': '46b14717-91f4-47d5-b540-86d6a523ba69',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'c1c38416-acf4-422a-abe1-a79a09762549',
    'base_price': 3452,
    'date_from': '2024-10-21T06:19:09.936Z',
    'date_to': '2024-10-22T15:40:09.936Z',
    'destination': '46b14717-91f4-47d5-b540-86d6a523ba69',
    'is_favorite': false,
    'offers': [],
    'type': 'sightseeing'
  }
];

export { MOCK_TRIP_POINTS };
