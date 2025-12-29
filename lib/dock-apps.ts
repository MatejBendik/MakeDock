// Default macOS apps with their icons
export interface DockApp {
  id: string;
  name: string;
  icon: string;
  isCustom?: boolean;
}

export const defaultApps: DockApp[] = [
  {
    id: 'finder',
    name: 'Finder',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/calculator-2021-04-29.png?rf=1024'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024'
  },
  {
    id: 'mail',
    name: 'Mail',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/mail-2021-05-25.png?rf=1024'
  }
];

export const availableApps: DockApp[] = [
  {
    id: 'finder',
    name: 'Finder',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/calculator-2021-04-29.png?rf=1024'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024'
  },
  {
    id: 'mail',
    name: 'Mail',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/mail-2021-05-25.png?rf=1024'
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024'
  },
  {
    id: 'safari',
    name: 'Safari',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024'
  },
  {
    id: 'arc',
    name: 'Arc',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/da3fa63b53f5b5b9088727ea895aa685_low_res_Arc__dark_.png'
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/eedbff3ef5fbf0baa52daf0cdd0d6505_low_res_chrome.png'
  },
  {
    id: 'brave',
    name: 'Brave',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/8fd272f2a048aee02d1ed1f29160540a_low_res_Brave.png'
  },
  {
    id: 'firefox',
    name: 'Firefox',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/80d190f77cb54771164da933f9485c5a_low_res_Firefox__Dark___macOS_26.2__.png'
  },
  {
    id: 'photos',
    name: 'Photos',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/photos-2021-05-28.png?rf=1024'
  },
  {
    id: 'music',
    name: 'Music',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/music-2021-05-25.png?rf=1024'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/calendar-2021-04-29.png?rf=1024'
  },
  {
    id: 'messages',
    name: 'Messages',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/messages-2021-05-25.png?rf=1024'
  },
  {
    id: 'facetime',
    name: 'FaceTime',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/b04a7c53fd9f231f804bd3261bcb6430_low_res_Facetime.png'
  },
  {
    id: 'maps',
    name: 'Maps',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/maps-2021-05-25.png?rf=1024'
  },
  {
    id: 'appstore',
    name: 'App Store',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/8f0aba462304996c37f9f506b368c53b_low_res_App_Store__MacOS_Tahoe_.png'
  },
  {
    id: 'systempreferences',
    name: 'System Preferences',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9b23bcaafd4c81fa40685736c9d2cac1_2DLff7nlvI.png'
  },
  {
    id: 'preview',
    name: 'Preview',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/preview-2021-05-28.png?rf=1024'
  },
  {
    id: 'xcode',
    name: 'Xcode',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/53ef82cc954d2fed837f43ec890f93a6_low_res_Xcode__Liquid_Glass_.png'
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/880bf964f1352d71af45f1893717e030_low_res_Visual_Studio_Code.png'
  },
  {
    id: 'ghostty',
    name: 'Ghostty',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/3fb391f668c626f75541ecf86496bb89_low_res_Ghostty__Liquid_Glass_.png'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/2966a8081bf2a5de2e69f29bb1915822_low_res_Spotify___Liquid_Glass__Dark_.png'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/44e0b1f7f48df3314ed86fed086639d4_low_res_Discord__Default_.png'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/figma-2021-05-05.png?rf=1024'
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/cf6442ea9f5040ff8569d35cda178ae6_low_res_Notion.png'
  },
  {
    id:'notioncalendar',
    name: 'Notion Calendar',
    icon: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/abf5445f59685b2541f36ce8226e0cc0_low_res_Notion_Calendar.png'
  }
];
