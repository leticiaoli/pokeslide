'use strict'

const gulp 			= require('gulp') //Gulp
const sourcemaps 	= require('gulp-sourcemaps') //Mapea codigo SASS para debug no console
const sass 			= require('gulp-sass')(require('sass')) //SASS
const autoprefixer 	= require('autoprefixer') //Aplica prefixo de navegadores antigos
const postcss 		= require('gulp-postcss') //PostCSS
const cssnano 		= require('cssnano') //Minifica css
const mqpacker 		= require('css-mqpacker') //Unifica todas as @medias da mesma condição em apenas uma
const terser        = require('gulp-terser') //Minifica os arquivos js
const imagemin      = require('gulp-imagemin'); //Otimiza as imagens
const webp          = require('gulp-webp'); //transforma imagens para o formato webp
const changed       = require('gulp-changed') //Verifica se houve alterações
const rename        = require('gulp-rename') // Renomeia arquivos
const browserSync   = require('browser-sync').create() //Synca os arquivos com o browser e faz o proxy reverso dos arquivos
const browserify    = require('browserify') //Converte commonJs para ES
const source        = require('vinyl-source-stream')
const buffer        = require('vinyl-buffer')
const babelify      = require('babelify') //Transpila arquivos js para versões antigas do ES
const glob          = require('glob') //Possibilita o uso da escrita do terminal no browserify

const config = {
    nickName: 'pw',
    repoUrl: 'https://github.com/rodrigotonifreitas/pokemon-website',
    production: false,
}

const paths = {
    dist: {
        dest: '/'
    },
    templates: {
        input: './src/html/**/*.html',
        dest: './build/html/',
        src: './src/html/**/*.html',
    },
    styles: {
        input: './src/sass/*.scss',
        dest: './build/css/',
        src: './src/sass/**/*.scss'
    },
    scripts: {
        input: './src/js/*.js',
        dest: './build/js/',
        src: './src/js/**/*.js'
    },
    images: {
        src: './src/images/**/*',
        dest: './build/images/'
    }
}

gulp.task('html', function () {
    return gulp.src(paths.templates.input)
      .pipe(gulp.dest(paths.templates.dest))
});

gulp.task('style', function () {
    let processors = [
        autoprefixer,
        cssnano,
        mqpacker
    ]
    return gulp.src(paths.styles.input)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename(`${config.nickName}-style.css`))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('style-dev', function () {
    let processors = [
        autoprefixer,
        mqpacker
    ]
    return gulp.src(paths.styles.input)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename(`${config.nickName}-style.css`))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('script', function () {
    let testFiles = glob.sync(paths.scripts.input)
    return browserify({
            entries: testFiles
        })
        .transform(babelify.configure({
            presets: ['@babel/env']
        }))
        .bundle()
        .pipe(source(`${config.nickName}-script.js`))
        .pipe(buffer())
        .pipe(terser({
            toplevel: true
        }))
        .pipe(gulp.dest(paths.scripts.dest))
})

gulp.task('script-dev', function () {
    let testFiles = glob.sync(paths.scripts.input)
    return browserify({
            entries: testFiles
        })
        .transform(babelify.configure({
            presets: ['@babel/env']
        }))
        .bundle()
        .pipe(source(`${config.nickName}-script.js`))
        .pipe(buffer())
        .pipe(gulp.dest(paths.scripts.dest))
})

gulp.task('image-minify', function(){
    return gulp.src(paths.images.src)
    .pipe(changed(paths.images.src))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({quality: 75, progressive: true}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest(paths.images.dest))
});

gulp.task('transformto-webp', function(){
    return gulp.src(paths.images.src)
    .pipe(changed(paths.images.src))
    .pipe(webp())
    .pipe(gulp.dest(paths.images.dest))
});

gulp.task("browserSyncProxy", function () {
    browserSync.init({
        server: {
            baseDir: "./build",
        },
        startPath: "/html/index.html",
    });
});

// const apiProxy = createProxyMiddleware("/", {
//     target: "https://" + config.accountName + ".vtexcommercestable.com.br",
//     cookieDomainRewrite: config.accountName + ".vtexlocal.com.br",
//     changeOrigin: true,
//     autoRewrite: true,
// });

// gulp.task("browserSyncProxy", function () {
//     return browserSync.init({
//       open: "external",
//       ui: false,
//       watch: true,
//       https: config.https || true,
//       host: config.accountName + ".vtexlocal.com.br",
//       startPath: "/admin/login/",
//       proxy: "https://" + config.accountName + ".vtexcommercestable.com.br",
//       middleware: [apiProxy],
//       serveStatic: [
//         {
//           route: "/arquivos",
//           dir: ["./build/arquivos"],
//         },
//       ],
//     });
// });

const watch = () => {
	gulp.watch(paths.templates.src, gulp.series('html')).on('change', browserSync.reload)
	gulp.watch(paths.styles.src, gulp.series('style')).on('change', browserSync.reload)
	gulp.watch(paths.scripts.src, gulp.series('script')).on('change', browserSync.reload)
	gulp.watch(paths.images.src, gulp.series('image-minify')).on('change', browserSync.reload)
}

const watchDev = () => {
	gulp.watch(paths.templates.src, gulp.series('html')).on('change', browserSync.reload)
	gulp.watch(paths.styles.src, gulp.series('style-dev')).on('change', browserSync.reload)
	gulp.watch(paths.scripts.src, gulp.series('script-dev')).on('change', browserSync.reload)
    gulp.watch(paths.images.src, gulp.series('image-minify')).on('change', browserSync.reload)
}

gulp.task('dev', gulp.parallel('html', 'style-dev', 'script-dev', 'image-minify', 'browserSyncProxy', watchDev));
gulp.task('build', gulp.parallel('html', 'style', 'script', 'image-minify', 'browserSyncProxy', watch))