
interface MwConfigValues {
	wgPageContentLanguage: string;
	wgPageName: string;
	wgUserName: string|null;
}

interface MwConfig {
	get<K extends keyof MwConfigValues>( key: K ): MwConfigValues[ K ];
}

export default MwConfig;