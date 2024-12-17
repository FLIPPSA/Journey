import "dotenv/config";

export default ({ config }) => {
	return {
		...config,
		extra: {
			SUPABASE_URL: process.env.SUPABASE_URL,
			SUPABASE_ANONKEY: process.env.SUPABASE_ANONKEY,
		},
	};
};
