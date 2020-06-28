<template>
  <div>
    <avue-crud
      :data="data.data"
      :option="option"
      :page="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="sortChange"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource !: string;
  data: any = {};
  option: any = {};
  page: any = {
    total: 0
  };

  query: any = {
    // sort: {_id: -1}
  };

  uploadAfter(res, done, loading, column) {
    console.log(res, column);
    done(loading);
    this.$message.success("上传后的方法");
  }

  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }

  async search(where, done) {
    //是否模糊匹配
    for (let k in where) {
      const field = this.option.column.find(v => v.prop === k);
      if (field.regex) {
        where[k] = { $regex: where[k] };
      }
    }
    this.query.where = where;
    this.fetch();
    done();
  }

  async sortChange({ prop, order }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1
      };
    }
    this.fetch();
  }

  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }

  async create(row, done, loading) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("创建成功");
    this.fetch();
    done(loading);
  }
  async update(row, index, done, loading) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
    this.$message.success("更新成功");
    this.fetch();
    done(loading);
  }

  async remove(row) {
    try {
      await this.$confirm("是否确认删除? ");
    } catch (error) {
      return;
    }
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.$message.success("删除成功");
    this.fetch();
  }

  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style>
</style>