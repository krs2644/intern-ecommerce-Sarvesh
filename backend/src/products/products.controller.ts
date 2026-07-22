import { Controller, Get, Param, ParseIntPipe, Query, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ImportProductsService } from './import-products.service';
import { SearchQueryDto, PaginationDto } from './dto';
import { ProductResponseDto, ImportProductsResponseDto } from './dto/product-response.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { Product } from '@prisma/client';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly importProductsService: ImportProductsService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all products with pagination' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Items per page', example: 10 })
    @ApiResponse({ status: 200, description: 'Paginated list of products' })
    findAll(@Query() pagination: PaginationDto): Promise<PaginatedResponseDto<Product>> {
        return this.productsService.findAll(pagination);
    }

    @Get('search')
    @ApiOperation({ summary: 'Search products by title, category, or brand' })
    @ApiQuery({ name: 'q', required: true, description: 'Search query', example: 'phone' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Items per page', example: 10 })
    @ApiResponse({ status: 200, description: 'Paginated matching products' })
    searchProducts(
        @Query() query: SearchQueryDto,
    ): Promise<PaginatedResponseDto<Product>> {
        const { q, ...pagination } = query;
        return this.productsService.search(q, pagination);
    }

    @Get('categories')
    @ApiOperation({ summary: 'Get all unique product categories' })
    @ApiResponse({ status: 200, description: 'List of categories', type: [String] })
    getCategories() {
        return this.productsService.getCategories();
    }

    @Get('category/:category')
    @ApiOperation({ summary: 'Get products by category' })
    @ApiParam({ name: 'category', description: 'Category name', example: 'smartphones' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Items per page', example: 10 })
    @ApiResponse({ status: 200, description: 'Paginated products in category' })
    getByCategory(
        @Param('category') category: string,
        @Query() pagination: PaginationDto,
    ): Promise<PaginatedResponseDto<Product>> {
        return this.productsService.getByCategory(category, pagination);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single product by ID' })
    @ApiParam({ name: 'id', description: 'Product ID', example: 1 })
    @ApiResponse({ status: 200, description: 'Product found', type: ProductResponseDto })
    @ApiResponse({ status: 404, description: 'Product not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Post('import')
    @ApiOperation({ summary: 'Import 30 products from DummyJSON API' })
    @ApiResponse({ status: 201, description: 'Products imported successfully', type: ImportProductsResponseDto })
    importProducts() {
        return this.importProductsService.importProducts();
    }
}
