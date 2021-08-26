import type { DropdownOption } from '@niku/react-native-dropdown-select';

export const options: DropdownOption[] = [
  {
    label: 'Select language or framework you love',
    value: null,
  },
  {
    label: 'Languages',
    options: [
      {
        label: 'Javascript',
        value: 'js',
      },
      {
        label: 'Typescript',
        value: 'ts',
      },
      {
        label: 'Python',
        value: 'py',
      },
    ],
  },
  {
    label: 'Frameworks - Libraies',
    options: [
      {
        label: 'Reactjs',
        value: 'reactjs',
      },
      {
        label: 'React Native',
        value: 'react-native',
      },
      {
        label: 'Vuejs',
        value: 'vuejs',
      },
      {
        label: 'Laravel',
        value: 'laravel',
      },
    ],
  },
  {
    label: 'Others',
    value: 'others',
  },
];

export const defaultValue = 'js';
