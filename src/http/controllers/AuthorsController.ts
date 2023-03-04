import { AppDataSource } from "@/database/data-source";
import { Author } from "@/database/entities/Author";
import { Paginator } from "@/database/Paginator";
import { ResponseUtil } from "@/utils/Response";
import { CreateAuthorDTO, UpdateAuthorDTO } from "@http/dtos/CreateAuthorDTO";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";

export class AuthorsController {
  async getAuthors(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");
    const { records: authors, paginationInfo } = await Paginator.paginate(builder, req);
    const authorsData = authors.map((author: Author) => {
      return author.toPayload();
    });
    return ResponseUtil.sendResponse(res, "Fetched authors successfully", authorsData, paginationInfo);
  }

  async getAuthor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtil.sendResponse<Author>(res, "Fetch author successfully", author.toPayload());
  }

  async create(req: Request, res: Response): Promise<Response> {
    const authorData = req.body;
    authorData.image = req.file?.filename;

    const dto = new CreateAuthorDTO();
    Object.assign(dto, authorData);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Author);
    const author = repo.create(authorData);
    await repo.save(author);

    return ResponseUtil.sendResponse(res, "Successfully created new author", author, 200);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const authorData = req.body;

    const dto = new UpdateAuthorDTO();
    Object.assign(dto, authorData);
    dto.id = parseInt(id);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Author);

    const author = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(author, authorData);
    await repo.save(author);
    return ResponseUtil.sendResponse(res, "Successfully updated the author", author.toPayload());
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repo = AppDataSource.getRepository(Author);
    const author = await repo.findOneByOrFail({
      id: Number(id),
    });
    await repo.remove(author);
    return ResponseUtil.sendResponse(res, "Successfully deleted the author", null);
  }
}
