import { Controller, Get, Param, ParseIntPipe, Query, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ImportProductsService } from './import-products.service';
import { SearchQueryDto } from './dto';
import { ProductResponseDto, ImportProductsResponseDto } from './dto/product-response.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly importProductsService: ImportProductsService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of all products', type: [ProductResponseDto] })
    findAll() {
        return this.productsService.findAll();
    }

    @Get('search')
    @ApiOperation({ summary: 'Search products by title, category, or brand' })
    @ApiQuery({ name: 'q', required: true, description: 'Search query', example: 'phone' })
    @ApiResponse({ status: 200, description: 'Matching products', type: [ProductResponseDto] })
    searchProducts(@Query() query: SearchQueryDto) {
        return this.productsService.search(query.q);
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
    @ApiResponse({ status: 200, description: 'Products in category', type: [ProductResponseDto] })
    getByCategory(@Param('category') category: string) {
        return this.productsService.getByCategory(category);
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
