<template>
  <div class="main" v-loading="activeloading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 标题部分 -->
    <div class="title"> 首页管理</div>
    <!-- 返回按钮 -->
    <div class="rt">
      <div><el-button type="primary" plain @click="rtindex">返回</el-button></div>
    </div>

    <el-tabs type="border-card">
      <!-- 班级档案 -->
      <el-tab-pane label="班级档案">
        <div>
          <div class="classhd">班级活动</div>
          <div>
            <div class="addbtn"><el-button type="success" icon="el-icon-plus" @click="openadd = true">添加活动</el-button></div>
            <el-table :data="active" stripe v-loading="activeloading01">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="日期：">
                      <span>{{ props.row.date }}</span>
                    </el-form-item>
                    <el-form-item label="标题：">
                      <span>{{ props.row.title }}</span>
                    </el-form-item>
                    <el-form-item label="内容描述">
                      <span>{{ props.row.txt }}</span>
                    </el-form-item>
                    <el-form-item label="图片：">
                      <div>
                        <el-tooltip content="点击查看图片" placement="right" effect="light">
                          <img :src="props.row.imgurl" alt="" width="180px" height="120pxx" @click="openimgs(props.row.imgurl)" />
                        </el-tooltip>
                      </div>
                      <div>
                        <el-tooltip content="下载图片" placement="left" effect="light">
                          <el-button icon="el-icon-download" @click="downloadimg(props.row.imgurl)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="复制图片连接" placement="right" effect="light">
                          <el-button icon="el-icon-paperclip" @click="fz(props.row.imgurl)"></el-button>
                        </el-tooltip>
                      </div>
                    </el-form-item>
                    <el-form-item label="图片描述：">
                      <span>{{ props.row.imgtxt }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="日期" prop="date" sortable></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="图片描述" prop="imgtxt"></el-table-column>
              <el-table-column label="操作">
                <el-button type="primary" icon="el-icon-edit" @click="openbj = true">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <!-- 路上风景 -->
      <el-tab-pane label="路上风景">
        <el-tabs tabPosition="left" style="height: 500px;">
          <el-tab-pane label="标题">
            <div class="tjimg">
              <el-button type="success" icon="el-icon-plus" @click="openadd03 = true">添加标题</el-button>
            </div>
            <div>
              <el-table :data="btlist" v-loading="activeloading02">
                <el-table-column label="标题内容" prop="title"></el-table-column>
                <el-table-column label="操作">
                  <el-button type="primary" icon="el-icon-edit" @click="openbj01 = true">编辑</el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="图片管理">
            <div class="tjimg">
              <el-button type="success" icon="el-icon-plus" @click="openadd01 = true">添加图片</el-button>
            </div>
            <div>
              <el-table :data="fjimg" height="480" v-loading="activeloading03">
                <el-table-column label="图片描述" prop="title"></el-table-column>
                <el-table-column label="图片展示">
                  <template slot-scope="scope">
                    <img :src="scope.row.imgurl" alt="" width="180px" height="90px" />
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <el-button type="primary" icon="el-icon-edit" @click="openbj03 = true">编辑</el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他内容" v-loading="activeloading04">
            <div class="tjimg">
              <el-button type="success" icon="el-icon-plus" @click="openadd04 = true">添加其他内容</el-button>
            </div>
            <div>
              <el-table :data="btlist01">
                <el-table-column label="其他内容" prop="title"></el-table-column>
                <el-table-column label="操作">
                  <el-button type="primary" icon="el-icon-edit" @click="openbj02 = true">编辑</el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <!-- 更新日志 -->
      <el-tab-pane label="更新日志">
        <div>
          <div class="addbtn"><el-button type="success" icon="el-icon-plus" @click="openadd02 = true">添加日志</el-button></div>
          <el-table :data="active01" stripe v-loading="activeloading05">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="日期：">
                    <span>{{ props.row.date }}</span>
                  </el-form-item>
                  <el-form-item label="标题：">
                    <span>{{ props.row.title }}</span>
                  </el-form-item>
                  <el-form-item label="描述：">
                    <span>{{ props.row.txt }}</span>
                  </el-form-item>
                  <el-form-item label="图片：">
                    <div>
                      <el-tooltip content="点击查看图片" placement="right" effect="light">
                        <img :src="props.row.imgurl" alt="" width="180px" height="120pxx" @click="openimgs(props.row.imgurl)" />
                      </el-tooltip>
                    </div>
                    <div>
                      <el-tooltip content="下载图片" placement="left" effect="light">
                        <el-button icon="el-icon-download" @click="downloadimg(props.row.imgurl)"></el-button>
                      </el-tooltip>
                      <el-tooltip content="复制图片连接" placement="right" effect="light">
                        <el-button icon="el-icon-paperclip" @click="fz(props.row.imgurl)"></el-button>
                      </el-tooltip>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="日期" prop="date" sortable></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="操作">
              <el-button type="primary" icon="el-icon-edit" @click="openbj04 = true">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 一些话 -->
      <el-tab-pane label="一些话">一些话</el-tab-pane>
    </el-tabs>

    <!-- 查看图片的对话框 -->
    <el-dialog :visible.sync="openimg" :close-on-click-modal="false" title="查看图片">
      <img :src="showimgurl" alt="" width="750px" />
    </el-dialog>

    <!-- 添加活动的对话框 -->
    <div>
      <el-dialog :visible.sync="openadd" :close-on-click-modal="false" title="添加活动">
        <el-form>
          <el-form-item>
            日期：
            <el-date-picker v-model="list.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="list.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="list.txt" placeholder="内容描述"></el-input>
          </el-form-item>
          <el-form-item>
            图片：
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple="false">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-input v-model="list.imgtxt" placeholder="图片描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="add">添加</el-button>
            <el-button @click="resetadd">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 编辑活动的对话框 -->
    <div>
      <el-dialog :visible.sync="openbj" :close-on-click-modal="false" title="编辑活动">
        <el-form :model="active">
          <el-form-item>
            日期：
            <el-date-picker v-model="active.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="active.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="active.txt" placeholder="内容描述"></el-input>
          </el-form-item>
          <el-form-item>
            图片：
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple="false">
              <img :src="active.imgurl" alt="" />
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-input v-model="active.imgtxt" placeholder="图片描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="bjqd">确定</el-button>
            <el-button @click="openbj = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 添加路上风景标题的对话框 -->
    <div>
      <el-dialog :visible.sync="openadd03" :close-on-click-modal="false" title="添加标题">
        <el-form :model="btlist">
          <el-form-item>
            <el-input v-model="btlist.title" placeholder="标题内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="add03">添加</el-button>
            <el-button @click="resetadd03">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 编辑路上风景标题的对话框 -->
    <div>
      <el-dialog :visible.sync="openbj01" :close-on-click-modal="false" title="编辑标题">
        <el-form :model="btlist">
          <el-form-item>
            <el-input v-model="btlist.title" placeholder="标题内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="bjqd01">确定</el-button>
            <el-button @click="openbj01 = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 添加路上风景图片的对话框 -->
    <div>
      <el-dialog :visible.sync="openadd01" :close-on-click-modal="false" title="添加图片">
        <el-form :model="fjimg">
          <el-form-item>
            <el-input v-model="fjimg.title" placeholder="图片描述"></el-input>
          </el-form-item>
          <el-form-item>
            图片：
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple="false">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="add01">添加</el-button>
            <el-button @click="resetadd01">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 编辑路上风景图片的对话框 -->
    <div>
      <el-dialog :visible.sync="openbj03" :close-on-click-modal="false" title="编辑图片">
        <el-form :model="fjimg">
          <el-form-item>
            <el-input v-model="fjimg.title" placeholder="图片描述"></el-input>
          </el-form-item>
          <el-form-item>
            图片：
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple="false">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="bjqd03">确定</el-button>
            <el-button @click="openbj03 = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 编辑路上风景其他内容的对话框 -->
    <div>
      <el-dialog :visible.sync="openbj02" :close-on-click-modal="false" title="编辑其他内容">
        <el-form :model="btlist">
          <el-form-item>
            <el-input v-model="btlist.title" placeholder="内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="bjqd02">确定</el-button>
            <el-button @click="openbj02 = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 编辑路上风景其他内容的对话框 -->
    <div>
      <el-dialog :visible.sync="openadd04" :close-on-click-modal="false" title="添加其他内容">
        <el-form :model="btlis01t">
          <el-form-item>
            <el-input v-model="btlist.title" placeholder="内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="add04">确定</el-button>
            <el-button @click="resetadd04">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 添加更新日志的对话框 -->
    <div>
      <el-dialog :visible.sync="openadd02" :close-on-click-modal="false" title="添加日志">
        <el-form :model="active01">
          <el-form-item>
            日期：
            <el-date-picker v-model="active01.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="active01.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="active01.txt" placeholder="描述"></el-input>
          </el-form-item>
          <el-form-item>
            图片：
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple="false">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="add02">添加</el-button>
            <el-button @click="resetadd02">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 编辑更新日志的对话框 -->
    <div>
      <el-dialog :visible.sync="openbj04" :close-on-click-modal="false" title="编辑日志">
        <el-form :model="active01">
          <el-form-item>
            日期：
            <el-date-picker v-model="active.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="active.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="active.txt" placeholder="描述"></el-input>
          </el-form-item>
          <el-form-item>
            图片：
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple="false">
              <img :src="active.imgurl" alt="" />
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="bjqd04">确定</el-button>
            <el-button @click="openbj04 = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      active: [
        {
          date: '2021-03-19',
          title: '团建活动',
          txt: '团建活动，户外烧烤，真人cs等等',
          imgtxt: '团建班级集体合照',
          imgurl: 'https://cn.bing.com/th?id=OHR.GreatHornbill_ZH-CN9550236034_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          date: '2010-01-13',
          title: '社会实践',
          txt: '三月学雷锋，组织户外社会实践，在学校打扫校道',
          imgtxt: '校园照片',
          imgurl: 'https://cn.bing.com/th?id=OHR.Alesund_ZH-CN9437421934_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          date: '2001-09-11',
          title: '元旦晚会',
          txt: '吃的很丰富，装饰很飘里亮，玩的很开心！',
          imgtxt: '节日班级照片',
          imgurl: 'https://cn.bing.com/th?id=OHR.Guatape_ZH-CN9344556154_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          date: '2011-03-21',
          title: '入学军训',
          txt: '刚刚入校，校园很大，天气炎热，军训开始',
          imgtxt: '校门口照片',
          imgurl: 'https://cn.bing.com/th?id=OHR.ParanalStars_ZH-CN9247250519_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        }
      ],
      openadd: false,
      openbj: false,
      openimg: false,
      openbj01: false,
      openbj02: false,
      openbj03: false,
      openadd01: false,
      openadd02: false,
      openbj04: false,
      openadd03: false,
      openadd04: false,
      list: {
        date: '',
        title: '',
        txt: '',
        imgtxt: ''
      },
      showimgurl: '',
      btlist: [
        {
          title: '1901班路上风景标题'
        }
      ],
      btlist01: [
        {
          title: '其他内容1..'
        },
        {
          title: '其他内容2..'
        },
        {
          title: '其他内容3..'
        },
        {
          title: '其他内容4..'
        }
      ],
      fjimg: [
        {
          title: '风景图片1',
          imgurl: 'https://cn.bing.com/th?id=OHR.GreatHornbill_ZH-CN9550236034_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          title: '风景图片2',
          imgurl: 'https://cn.bing.com/th?id=OHR.Alesund_ZH-CN9437421934_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          title: '风景图片3',
          imgurl: 'https://cn.bing.com/th?id=OHR.Guatape_ZH-CN9344556154_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          title: '风景图片4',
          imgurl: 'https://cn.bing.com/th?id=OHR.ParanalStars_ZH-CN9247250519_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          title: '风景图片3',
          imgurl: 'https://cn.bing.com/th?id=OHR.Guatape_ZH-CN9344556154_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          title: '风景图片2',
          imgurl: 'https://cn.bing.com/th?id=OHR.Alesund_ZH-CN9437421934_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          title: '风景图片1',
          imgurl: 'https://cn.bing.com/th?id=OHR.GreatHornbill_ZH-CN9550236034_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        }
      ],
      active01: [
        {
          date: '2021-03-19',
          title: '团建活动',
          txt: '团建活动，户外烧烤，真人cs等等',
          imgurl: 'https://cn.bing.com/th?id=OHR.GreatHornbill_ZH-CN9550236034_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          date: '2010-01-13',
          title: '社会实践',
          txt: '三月学雷锋，组织户外社会实践，在学校打扫校道',
          imgurl: 'https://cn.bing.com/th?id=OHR.Alesund_ZH-CN9437421934_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          date: '2001-09-11',
          title: '元旦晚会',
          txt: '吃的很丰富，装饰很飘里亮，玩的很开心！',
          imgurl: 'https://cn.bing.com/th?id=OHR.Guatape_ZH-CN9344556154_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        },
        {
          date: '2011-03-21',
          title: '入学军训',
          txt: '刚刚入校，校园很大，天气炎热，军训开始',
          imgurl: 'https://cn.bing.com/th?id=OHR.ParanalStars_ZH-CN9247250519_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
        }
      ],
      activeloading: false,
      activeloading01: false,
      activeloading02: false,
      activeloading03: false,
      activeloading04: false,
      activeloading05: false
    };
  },
  methods: {
    resetadd04() {
      this.btlist01 = {
        title: ''
      };
    },
    add04() {
      this.openadd02 = false;
      this.$notify({
        title: '成功',
        message: '添加成功',
        type: 'success'
      });
      this.activeloading04 = true;
      setTimeout(() => {
        this.activeloading04 = false;
      }, 600);
    },
    resetadd03() {
      this.btlist = {
        title: ''
      };
    },
    add03() {
      this.openadd03 = false;
      this.$notify({
        title: '成功',
        message: '添加成功',
        type: 'success'
      });
      this.activeloading02 = true;
      setTimeout(() => {
        this.activeloading02 = false;
      }, 600);
    },
    query() {
      this.activeloading = true;
      setTimeout(() => {
        this.activeloading = false;
      }, 600);
    },
    bjqd04() {
      this.openbj04 = false;
      this.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success'
      });
      this.activeloading05 = true;
      setTimeout(() => {
        this.activeloading05 = false;
      }, 600);
    },
    resetadd02() {
      this.active01 = {
        title: '',
        txt: '',
        imgurl: ''
      };
    },
    add02() {
      this.openadd02 = false;
      this.$notify({
        title: '成功',
        message: '添加成功',
        type: 'success'
      });
      this.activeloading05 = true;
      setTimeout(() => {
        this.activeloading05 = false;
      }, 600);
    },
    resetadd01() {
      this.fjimg = {
        title: '',
        imgurl: ''
      };
    },
    add01() {
      this.openadd01 = false;
      this.$notify({
        title: '成功',
        message: '添加成功',
        type: 'success'
      });
      this.activeloading03 = true;
      setTimeout(() => {
        this.activeloading03 = false;
      }, 600);
    },
    bjqd03() {
      this.openbj03 = false;
      this.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success'
      });
      this.activeloading03 = true;
      setTimeout(() => {
        this.activeloading03 = false;
      }, 600);
    },
    bjqd02() {
      this.openbj02 = false;
      this.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success'
      });
      this.activeloading04 = true;
      setTimeout(() => {
        this.activeloading04 = false;
      }, 600);
    },
    bjqd01() {
      this.openbj01 = false;
      this.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success'
      });
      this.activeloading02 = true;
      setTimeout(() => {
        this.activeloading02 = false;
      }, 600);
    },
    openimgs(imgurl) {
      this.openimg = true;
      this.showimgurl = imgurl;
    },
    downloadimg(imgurl) {
      window.open(imgurl);
    },
    fz(imgurl) {
      this.copyData = imgurl;
      this.copy(this.copyData);
    },
    copy(data) {
      let url = data;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand('Copy'); // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      });
      oInput.remove();
    },
    bjqd() {
      this.openbj = false;
      this.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success'
      });
      this.activeloading01 = true;
      setTimeout(() => {
        this.activeloading01 = false;
      }, 600);
    },
    del() {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success'
      });
      this.activeloading01 = true;
      setTimeout(() => {
        this.activeloading01 = false;
      }, 600);
      this.activeloading02 = true;
      setTimeout(() => {
        this.activeloading02 = false;
      }, 600);
      this.activeloading03 = true;
      setTimeout(() => {
        this.activeloading03 = false;
      }, 600);
      this.activeloading04 = true;
      setTimeout(() => {
        this.activeloading04 = false;
      }, 600);
      this.activeloading05 = true;
      setTimeout(() => {
        this.activeloading05 = false;
      }, 600);
    },
    resetadd() {
      this.list = {
        date: '',
        title: '',
        txt: '',
        imgtxt: ''
      };
    },
    add() {
      this.openadd = false;
      this.$notify({
        title: '成功',
        message: '添加成功',
        type: 'success'
      });
      this.list = {
        date: '',
        title: '',
        txt: '',
        imgtxt: ''
      };
      this.activeloading01 = true;
      setTimeout(() => {
        this.activeloading01 = false;
      }, 600);
    },
    rtindex() {
      this.$router.push('/back/backindex');
    }
  },
  created() {
    this.query();
  }
};
</script>
<style>
.main {
  position: absolute;
  top: 0px;
  left: 0px;
  min-width: 100vw;
  min-height: 100vh;
}

.title {
  font-size: 1.6rem;
  text-align: center;
  font-weight: bold;
  color: rgb(255, 255, 255);
  background-image: url('https://th.bing.com/th/id/R5217d816ea5b7dba3fdbd113fe756ad1?rik=vQMr9zA76FEcKA&riu=http%3a%2f%2fwww.zlcool.com%2fd%2ffile%2f2011%2f12%2f26%2f7ada32f473314a771545dd5c334be7ed.jpg&ehk=Uavf0pLAhmZMBZQ85t5XN792LJQjrBIdVlAvBwRSmjw%3d&risl=&pid=ImgRaw');
  background-size: cover;
  padding: 1.5rem;
}

.rt {
  display: flex;
  padding: 1rem;
  border-top: 3px solid rgba(58, 56, 56, 0.575);
}

.rt > div {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.classhd {
  text-align: center;
  padding: 0.5rem;
  font-size: 1.3rem;
}

.addbtn {
  display: flex;
  justify-content: flex-end;
  margin-right: 3rem;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #7c9ac2;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

.tjimg {
  display: flex;
  justify-content: flex-end;
}
</style>
