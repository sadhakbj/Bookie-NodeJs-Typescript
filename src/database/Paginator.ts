interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export class Paginator {
  static async paginate(queryBuilder, req) {
    let page = Number(req.query.page) || 1;
    let pageSize = Number(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const records = await queryBuilder.skip(offset).take(pageSize).getMany();
    const totalItems = await queryBuilder.getCount();

    const pages = Math.ceil(totalItems / pageSize);
    const currentPage = offset / pageSize + 1;
    const hasNext = currentPage < pages;
    const hasPrevious = currentPage > 1;

    const paginationInfo: PaginationInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalItems,
      pages,
      hasNext,
      hasPrevious,
    };
    return { records, paginationInfo };
  }
}
