"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeController = void 0;
const common_1 = require("@nestjs/common");
const me_service_1 = require("./me.service");
const create_user_req_dto_1 = require("./dto/request-dto/create-user.req.dto");
const response_dto_1 = require("../common/response.dto");
const decorator_dto_1 = require("../common/decorator.dto");
const user_entity_1 = require("../entities/user.entity");
const update_user_req_dto_1 = require("./dto/request-dto/update-user.req.dto");
const swagger_1 = require("@nestjs/swagger");
const delete_user_res_dto_1 = require("./dto/response-dto/delete-user.res.dto");
const http_exception_dto_1 = require("../common/http-exception.dto");
const restore_user_res_dto_1 = require("./dto/response-dto/restore-user.res.dto");
const restore_user_req_dto_1 = require("./dto/request-dto/restore-user.req.dto");
const checkInfo_user_req_dto_1 = require("./dto/request-dto/checkInfo-user.req.dto");
const checkInfo_user_res_dto_1 = require("./dto/response-dto/checkInfo-user.res.dto");
const create_user_res_dto_1 = require("./dto/response-dto/create-user.res.dto");
const see_user_res_dto_1 = require("./dto/response-dto/see-user.res.dto");
const update_user_res_dto_1 = require("./dto/response-dto/update-user.res.dto");
const create_bookmark_res_dto_1 = require("./dto/response-dto/create-bookmark.res.dto");
const delete_bookmark_res_dto_1 = require("./dto/response-dto/delete-bookmark.res.dto");
let MeController = class MeController {
    constructor(meService) {
        this.meService = meService;
    }
    async signUp(createUserDto) {
        return this.meService.signUp(createUserDto);
    }
    async getMyInfo(user) {
        return this.meService.getMyInfo(user);
    }
    async updateMyAccount(user, updateUserDto) {
        return this.meService.updateMyAccount(user, updateUserDto);
    }
    async deleteMyAccount(user, accessToken, tokenType) {
        return this.meService.deleteMyAccount(user, accessToken, tokenType);
    }
    async restoreMyAccount(restoreUserDto) {
        return this.meService.restoreMyAccount(restoreUserDto);
    }
    async checkMyInfo(user, checkInfoUserDto) {
        return this.meService.checkMyInfo(user, checkInfoUserDto);
    }
    async addBookmark(recipeId, user) {
        return this.meService.addBookmark(recipeId, user);
    }
    async deleteBookmark(recipeId) {
        return this.meService.deleteBookamark(recipeId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '????????????' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '???????????? ??????',
        type: create_user_res_dto_1.CreateUserResDto,
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: '????????? ??????',
        type: http_exception_dto_1.ConflictErrorRes,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: '?????? ??????',
        type: http_exception_dto_1.InternalServerErrorRes,
    }),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_req_dto_1.CreateUserReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '??????????????? ??????' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '????????? ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '??????????????? ?????? ??????',
        type: see_user_res_dto_1.SeeUserResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '?????? ??????',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '????????? ??????',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '????????? ?????????',
        type: http_exception_dto_1.NotFoundErrorRes,
    }),
    (0, common_1.Get)('me'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '??????????????????' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '????????? ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '?????????????????? ??????',
        type: update_user_res_dto_1.UpdateUserResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '?????? ??????',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '????????? ??????',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '????????? ?????????',
        type: http_exception_dto_1.NotFoundErrorRes,
    }),
    (0, common_1.Patch)('me'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_user_req_dto_1.UpdateUserReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "updateMyAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '????????????' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '????????? ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '???????????? ??????',
        type: delete_user_res_dto_1.DeleteUserResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '?????? ??????',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '????????? ??????',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: '?????? ??????',
        type: http_exception_dto_1.InternalServerErrorRes,
    }),
    (0, common_1.Delete)('me'),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __param(2, (0, common_1.Query)('tokenType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "deleteMyAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '????????????' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '???????????? ??????',
        type: restore_user_res_dto_1.RestoreUserResDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '????????? ?????????',
        type: http_exception_dto_1.NotFoundErrorRes,
    }),
    (0, common_1.Post)('restore'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restore_user_req_dto_1.RestoreUserReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "restoreMyAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '?????????????????? ?????? ??????' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '????????? ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '???????????? ??????',
        type: checkInfo_user_res_dto_1.CheckInfoUserResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '?????? ??????',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '????????? ??????',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '????????? ?????????',
        type: http_exception_dto_1.NotFoundErrorRes,
    }),
    (0, common_1.Post)('checkMyInfo'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, decorator_dto_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        checkInfo_user_req_dto_1.CheckInfoUserReqDto]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "checkMyInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '????????? ??????' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '????????? ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'recipeId',
        description: '????????? id',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '????????? ?????? ??????',
        type: create_bookmark_res_dto_1.CreateBookmarkResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '?????? ??????',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '????????? ??????',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: '????????? ??????',
        type: http_exception_dto_1.ConflictErrorRes,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: '?????? ??????',
        type: http_exception_dto_1.InternalServerErrorRes,
    }),
    (0, common_1.Post)(':recipeId/bookmarks'),
    __param(0, (0, common_1.Param)('recipeId')),
    __param(1, (0, decorator_dto_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "addBookmark", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '????????? ??????' }),
    (0, swagger_1.ApiQuery)({
        name: 'tokenType',
        description: '????????? ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer + ????????? ??????',
        required: true,
    }),
    (0, swagger_1.ApiParam)({
        name: 'recipeId',
        description: '????????? id',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '????????? ?????? ??????',
        type: delete_bookmark_res_dto_1.DeleteBookmarkResDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: '?????? ??????',
        type: http_exception_dto_1.UnauthorizedErrorRes,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '????????? ??????',
        type: http_exception_dto_1.BadRequestErrorRes,
    }),
    (0, common_1.Delete)(':recipeId/bookmarks'),
    __param(0, (0, common_1.Param)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "deleteBookmark", null);
MeController = __decorate([
    (0, swagger_1.ApiTags)('Me'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [me_service_1.MeService])
], MeController);
exports.MeController = MeController;
//# sourceMappingURL=me.controller.js.map