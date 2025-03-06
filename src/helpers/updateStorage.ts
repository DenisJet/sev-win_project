import { Row } from "src/api/api.types";

export type ActionType = "delete" | "update" | "create";

export const updateChangedItems = (
  storageData: Row[],
  changedData: Row[] | [],
): Row[] => {
  if (changedData && changedData.length > 0) {
    return storageData.map((item: Row) => {
      const changedItem = changedData.find(
        (changed: Row) => changed.id === item.id,
      );

      if (changedItem) {
        return {
          ...changedItem,
          child:
            item.child && item.child.length > 0
              ? updateChangedItems(item.child, changedData)
              : item.child,
        };
      }

      if (item.child && item.child.length > 0) {
        return {
          ...item,
          child: updateChangedItems(item.child, changedData),
        };
      }

      return item;
    });
  }

  return storageData;
};

export const createItem = (
  storageData: Row[],
  createdRow: Row,
  parentId: number | null,
): Row[] => {
  if (parentId === null) {
    return [...storageData, createdRow];
  }

  return storageData.map((item: Row) => {
    if (item.id === parentId) {
      return {
        ...item,
        child: item.child ? [...item.child, createdRow] : [createdRow],
      };
    }

    if (item.child && item.child.length > 0) {
      return {
        ...item,
        child: createItem(item.child, createdRow, parentId),
      };
    }

    return item;
  });
};

export const updateItemById = (storageData: Row[], changedRow: Row): Row[] => {
  return storageData.map((item: Row) => {
    if (item.id === changedRow.id) {
      return {
        ...changedRow,
        child: item.child || [],
      };
    }

    if (item.child && item.child.length > 0) {
      return {
        ...item,
        child: updateItemById(item.child, changedRow),
      };
    }

    return item;
  });
};

export const deleteItemById = (storageData: Row[], rowId: number): Row[] => {
  return storageData
    .filter((item) => item.id !== rowId)
    .map((item) => {
      if (item.child && item.child.length > 0) {
        return {
          ...item,
          child: deleteItemById(item.child, rowId),
        };
      }

      return item;
    });
};
