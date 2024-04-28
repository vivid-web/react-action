import { defineConfig, Options } from "tsup";
import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions";

const cjsConfig = (baseOptions: Options): Options => ({
	...baseOptions,
	format: "cjs",
	outDir: "dist/cjs",
});

const esmConfig = (baseOptions: Options): Options => ({
	...baseOptions,
	format: "esm",
	outDir: "dist/esm",
});

export default defineConfig(({ watch }) => {
	const baseConfig = {
		entry: ["src/**/*.ts", "src/**/*.tsx"],
		target: "es2022",
		sourcemap: true,
		clean: !!watch,
		esbuildPlugins: [
			esbuildPluginFilePathExtensions({
				cjsExtension: "js",
				esmExtension: "mjs",
			}),
		],
	} satisfies Options;

	return [cjsConfig(baseConfig), esmConfig(baseConfig)];
});
