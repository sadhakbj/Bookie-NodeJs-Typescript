export class PageUtil {
  static async paginate(queryBuilder, req, res) {
    let page = Number(req.query.page) || 1
    let pageSize = Number(req.query.pageSize) || 10

    const offset = (page - 1) * pageSize
    const items = await queryBuilder.skip(offset).take(pageSize).getMany()

    const count = await queryBuilder.getCount()
    const pages = Math.ceil(count / pageSize)
    const currentPage = offset / pageSize + 1
    const hasNext = currentPage < pages
    const hasPrev = currentPage > 1

    const paginationInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalItems: count,
      pages: pages,
      hasNext,
      hasPrev,
    }

    return { items, paginationInfo }
  }
}
