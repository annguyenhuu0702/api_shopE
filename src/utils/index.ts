export const generateIncludeParentCategory = (depth: number): any => {
  const result: any = {};
  let check = result;
  let temp;
  let i = 1;
  while (i >= 1 && i <= depth) {
    check.include = {
      parent: i === depth ? true : {},
    };
    temp = check.include.parent;
    if (i !== depth) {
      check = temp;
    }
    i++;
  }
  return result;
};

export const generateIncludeChildrenCategory = (depth: number): any => {
  if (isNaN(depth)) return {};
  if (depth < 1) return {};
  let result: any = {};
  let check = result;
  let temp;
  let i = 1;
  while (i >= 1 && i <= depth) {
    check.include = {
      categoryType: true,
      parent: generateIncludeParentCategory(depth - 1),
      children: i === depth ? true : { orderBy: [{ id: "desc" }] },
    };
    temp = check.include.children;
    if (i !== depth) {
      check = temp;
    }
    i++;
  }

  return result.include;
};
