const path = require('path');
const recursiveReadDir = require('recursive-readdir');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const dateFns = require('date-fns');
const matter = require('gray-matter');
const log = require('signale');

const cwd = process.cwd();

const CONTENTS_PATH = `${cwd}/content/blog`;
const IGNORE_DIR = 'images';
const UTF_8 = 'utf8';
const DATE_FORMAT = 'yyyy-MM-dd HH:MM:SS';

const VALIDATION = {
  TITLE: {
    MIN_LENGTH: 4,
    MAX_LENGTH: 30,
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 200,
  },
  CATEGORY: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 20,
  },
};

const VALIDATION_ERROR_MESSAGE = {
  SINGLE_QUATE: 'Single quotes are not allowed',
  DUPLICATE: 'Duplicate exists',
  TITLE_LENGTH: `Title length should be between ${VALIDATION.TITLE.MIN_LENGTH} ~ ${VALIDATION.TITLE.MAX_LENGTH} letters`,
  DESCRIPTION_LENGTH: `Description length should be between ${VALIDATION.DESCRIPTION.MIN_LENGTH} ~ ${VALIDATION.DESCRIPTION.MAX_LENGTH} letters`,
  CATEGORY_LENGTH: `Category name length should be between ${VALIDATION.CATEGORY.MIN_LENGTH} ~ ${VALIDATION.CATEGORY.MAX_LENGTH} letters`,
};

const getCategoryOptions = async () => {
  const ignores = (file, stats) => stats.isDirectory() && path.basename(file) === IGNORE_DIR;
  const mdFiles = await recursiveReadDir(CONTENTS_PATH, [ignores]);
  const categories = Array.from(
    mdFiles
      .map((file) => fs.readFileSync(file, UTF_8))
      .map((str) => matter(str).data.category)
      .reduce((acc, curr) => {
        if (curr) acc.add(curr);
        return acc;
      }, new Set()),
  );
  return categories;
};

const getCategory = async () => {
  let selectedCategory = null;
  const categoryOptions = await getCategoryOptions();
  const newCategoryOption = 'Create new category';

  const { selectedOption } = await inquirer.prompt([
    {
      name: 'selectedOption',
      type: 'list',
      message: 'Please select or create a category',
      choices: [...categoryOptions, new inquirer.Separator(), newCategoryOption],
    },
  ]);

  switch (selectedOption) {
    case newCategoryOption: {
      const { newCategory } = await inquirer.prompt([
        {
          type: 'input',
          name: 'newCategory',
          message: 'Enter new category name',
          validate: (val) => {
            if (val.length < VALIDATION.CATEGORY.MIN_LENGTH || val.length > VALIDATION.CATEGORY.MAX_LENGTH)
              return VALIDATION_ERROR_MESSAGE.CATEGORY_LENGTH;
            if (val.includes("'")) return VALIDATION_ERROR_MESSAGE.SINGLE_QUATE;
            if (categoryOptions.includes(val)) return VALIDATION_ERROR_MESSAGE.DUPLICATE;
            return true;
          },
        },
      ]);
      selectedCategory = newCategory;
      break;
    }
    default: {
      selectedCategory = selectedOption;
    }
  }
  return { category: selectedCategory };
};

const getTargetPath = ({ category, fileName }) => `${CONTENTS_PATH}/${category}/${fileName}.md`;
const formatFileName = (name) => name.split(' ').join('_').toLowerCase();

const getTitle = async (category) => {
  const { title } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title: ',
      validate: async (val) => {
        if (val.includes("'")) return VALIDATION_ERROR_MESSAGE.SINGLE_QUATE;
        if (val.length < VALIDATION.TITLE.MIN_LENGTH || val.length > VALIDATION.TITLE.MAX_LENGTH)
          return VALIDATION_ERROR_MESSAGE.TITLE_LENGTH;
        const fileName = formatFileName(val);
        const targetPath = getTargetPath({ category, fileName });
        const isTargetPathExists = await fs.pathExists(targetPath);
        if (isTargetPathExists) return VALIDATION_ERROR_MESSAGE.DUPLICATE;
        return true;
      },
    },
  ]);
  return { title, fileName: formatFileName(title) };
};

const getDescription = async () => {
  const description = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Enter the description: ',
      validate: async (val) => {
        if (val.length < VALIDATION.DESCRIPTION.MIN_LENGTH || val.length > VALIDATION.DESCRIPTION.MAX_LENGTH)
          return VALIDATION_ERROR_MESSAGE.DESCRIPTION_LENGTH;
        return true;
      },
    },
  ]);
  return description;
};

const formatContents = (contents) => matter.stringify('', contents).split("'").join('');

(async () => {
  const date = dateFns.format(new Date(), DATE_FORMAT);
  log.info('✏️  Gatsby blog starter post generator');
  log.info('📅 Date : ', date);
  log.start('🚀 Start creating new post\n');
  const { category } = await getCategory();

  const targetDir = `${CONTENTS_PATH}/${category}`;
  const isTargetDirPresent = await fs.pathExists(targetDir);

  if (!isTargetDirPresent) await fs.ensureDir(targetDir);
  const { title, fileName } = await getTitle(category);
  const { description } = await getDescription();
  const targetPath = getTargetPath({ category, fileName });

  const contents = formatContents({
    title,
    date,
    description,
    category,
  });

  fs.writeFile(targetPath, contents, (err) => {
    if (err) log.error('Unknown Error: Cannot write file!');
  });

  log.complete(`Successfully created new post!\n Please check /${category}/${fileName}.md\n\n`);
  log.star('\n', contents);
})();

// Reference Code From https://github.com/JaeYeopHan/gatsby-post-gen

// const path = require('path');
// const fs = require('fs-extra');
// const dateFns = require('date-fns');
// const _ = require('lodash');
// const rr = require('recursive-readdir');
// const matter = require('gray-matter');
// const inquirer = require('inquirer');
// const log = require('signale');
// const cwd = process.cwd();

// const CONTENTS_DIR = '/content/blog';
// const TARGET_DIR = `${cwd}${CONTENTS_DIR}`;
// const IGNORE_DIR = 'images';
// const UTF_8 = 'utf8';
// const DATE_FORMAT = 'yyyy-MM-dd HH:MM:SS';

// const ignoreFunc = (file, stats) => stats.isDirectory() && path.basename(file) == IGNORE_DIR;

// const getCategories = async () => {
//   const markdownFiles = await rr(TARGET_DIR, [ignoreFunc]);

//   return _.uniq(
//     markdownFiles
//       .map((file) => fs.readFileSync(file, UTF_8))
//       .map((str) => matter(str).data.category)
//       .filter((val) => !!val)
//       .map((str) => str.trim().toLowerCase()),
//   );
// };

// const getFileName = (title) => title.split(' ').join('-').toLowerCase();

// const refineContents = (rawContents) => matter.stringify('', rawContents).split("'").join('');

// const fetchCategory = async () => {
//   let category;
//   const customCategoryOption = '[ CREATE NEW CATEGORY ]';
//   const categories = await getCategories();
//   const categoryChoices = [...categories, new inquirer.Separator(), customCategoryOption];
//   const { selectedCategory } = await inquirer.prompt([
//     {
//       type: 'list',
//       name: 'selectedCategory',
//       message: 'Select a category: ',
//       choices: categoryChoices,
//     },
//   ]);

//   if (selectedCategory === customCategoryOption) {
//     const { customizedCategory } = await inquirer.prompt([
//       {
//         type: 'input',
//         name: 'customizedCategory',
//         message: 'Enter the customized category',
//         validate: (val) => {
//           if (val.includes("'")) {
//             return 'Cannot use single quote';
//           }

//           if (categories.includes(val)) {
//             return `Already exist category name:: ${val}`;
//           }

//           return true;
//         },
//       },
//     ]);
//     category = customizedCategory;
//   } else {
//     category = selectedCategory;
//   }

//   if (!category) {
//     log.error('Cannot find category :(\n');
//     throw Error('Unknown Error...');
//   }

//   return category;
// };

// const fetchTitle = async (category) => {
//   const { title } = await inquirer.prompt([
//     {
//       type: 'input',
//       name: 'title',
//       message: 'Enter the title: ',
//       default: () => 'New post title',
//       validate: async (val) => {
//         if (val.includes("'")) {
//           return 'Cannot use single quote';
//         }

//         const fileName = getFileName(val);
//         const dest = `${TARGET_DIR}/${category}/${fileName}.md`;
//         const destFileExists = await fs.pathExists(dest);

//         if (destFileExists) {
//           return `⚠️  Already exist file name:: ${fileName}.md.`;
//         }

//         return true;
//       },
//     },
//   ]);

//   return title;
// };

// module.exports = (async function () {
//   const date = dateFns.format(new Date(), DATE_FORMAT);

//   log.info('📅 Create new post:', date);
//   log.start('🚚 Start to process!\n');

//   const category = await fetchCategory();
//   const destDir = `${TARGET_DIR}/${category}`;
//   const destDirExists = await fs.pathExists(destDir);

//   if (!destDirExists) {
//     await fs.ensureDir(destDir);
//   }

//   const title = await fetchTitle(category);
//   const fileName = getFileName(title);
//   const contents = refineContents({
//     title,
//     date,
//     category,
//     thumbnail: '{ thumbnailSrc }',
//     draft: false,
//   });

//   fs.writeFile(`${destDir}/${fileName}.md`, contents, (err) => {
//     if (err) {
//       log.error('Unknown Error: Cannot write file!');
//       return;
//     }
//     console.log('');

//     log.complete(`🚀 Success to create new post! /${category}/${fileName}.md\n\n${contents}`);
//     log.star(`✏️  Let's start blogging!\n`);
//   });
// })();
