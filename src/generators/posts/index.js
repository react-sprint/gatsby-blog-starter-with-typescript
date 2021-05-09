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
