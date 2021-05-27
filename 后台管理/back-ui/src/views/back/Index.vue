<template>
  <div class="main" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 标题部分 -->
    <div class="title">首页管理</div>
    <!-- 返回按钮 -->
    <div class="rt">
      <div><el-button type="info" icon="el-icon-d-arrow-left" @click="rtindex">返回</el-button></div>
    </div>

    <el-tabs type="border-card">
      <!-- 班级档案 -->
      <el-tab-pane label="班级档案">
        <span slot="label"><i class="el-icon-folder-opened"> 班级档案</i></span>
        <div>
          <!-- <el-tabs :tab-position="(tabPosition = 'left')" style="height: 500px;"> -->
          <!-- <el-tab-pane label="活动信息"> -->
          <!-- <span slot="label"><i class="el-icon-tickets"> 活动信息</i></span> -->
          <div class="classhd">活动信息</div>

          <div class="query-btn">
            <div>
              <el-input v-model="queryInfo.activeTime" placeholder="日期模糊查询"></el-input>
            </div>
            <div>
              <el-input v-model="queryInfo.activeTitle" placeholder=" 标题模糊查询"></el-input>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-search" @click="queryActive">查询</el-button>
            </div>
            <div>
              <el-button type="success" icon="el-icon-plus" @click="openadd = true">添加活动</el-button>
            </div>
            <div>
              <el-button type="success" icon="el-icon-plus" @click="openaddactivetp = true">添加活动图片</el-button>
            </div>
            <div>
              <el-button type="warning" icon="el-icon-refresh-right" round @click="queryNew">刷新</el-button>
            </div>
          </div>
          <div>
            <el-table :data="activelist" stripe v-loading="activeloading" height="460">
              <el-table-column label="活动编号" prop="paid"></el-table-column>
              <el-table-column label="日期" prop="activeTime" sortable>
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.activeTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="标题" prop="activeTitle"></el-table-column>
              <el-table-column label="最后修改时间" sortable prop="lastupdate">
                <template slot-scope="scope">
                  {{ scope.row.lastupdate | formatDate }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="socpe">
                  <el-button type="success" size="medium" plain icon="el-icon-search" @click="ck(socpe.row)">信息</el-button>
                  <el-button type="success" size="medium" plain icon="el-icon-search" @click="selectActiveImg(socpe.row)">图片</el-button>
                  <br />
                  <el-button type="primary" size="medium" plain icon="el-icon-edit" @click="showupdate(socpe.row)">编辑</el-button>
                  <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="del(socpe.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <page :page="activePage" @page-change="queryActive" v-loading="activeloading" class="pg"></page>
          </div>
          <!-- </el-tab-pane> -->
          <!-- </el-tabs> -->
        </div>
      </el-tab-pane>
      <!-- 路上风景 -->
      <el-tab-pane label="路上风景">
        <span slot="label"><i class="el-icon-sunrise-1"> 路上风景</i></span>
        <div>
          <el-tabs :tab-position="(tabPosition = 'left')" style="height: 570px;">
            <el-tab-pane label="标题">
              <span slot="label"><i class="el-icon-document"> 标题</i></span>
              <div class="classhd">标题</div>

              <div class="query-btn">
                <div>
                  <el-button type="success" icon="el-icon-plus" @click="openaddfjbt = true">添加</el-button>
                </div>
                <div>
                  <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNewfjbt">刷新</el-button>
                </div>
              </div>
              <div>
                <el-table :data="fjbtlist" stripe v-loading="fjbtloading" height="340">
                  <el-table-column label="信息分组" prop="messageGroup"></el-table-column>
                  <el-table-column label="信息关键词" prop="messageKey"></el-table-column>
                  <el-table-column label="最后修改时间" sortable prop="lastupdate">
                    <template slot-scope="scope">
                      {{ scope.row.lastupdate | formatDate }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="socpe">
                      <el-button type="success" plain icon="el-icon-search" @click="ckfjbt(socpe.row)">查看</el-button>
                      <el-button type="primary" plain icon="el-icon-edit" @click="showupdatefjbt(socpe.row)">编辑</el-button>
                      <el-button type="danger" plain icon="el-icon-delete" @click="delfjbt(socpe.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <page :page="fjbtPage" @page-change="queryFjbt" class="pg" v-loading="fjbtloading"></page>
              </div>
            </el-tab-pane>
            <el-tab-pane label="展示图片">
              <span slot="label"><i class="el-icon-picture"></i> 展示图片</span>
              <div class="classhd">展示图片</div>

              <div class="query-btn">
                <div>
                  <el-button type="success" icon="el-icon-plus" @click="openaddfjtp = true">添加</el-button>
                </div>
                <div>
                  <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNewfjtp">刷新</el-button>
                </div>
              </div>
              <div>
                <el-table :data="fjtplist" stripe v-loading="fjtploading" height="420">
                  <el-table-column label="文件编号" prop="fid"></el-table-column>
                  <el-table-column label="文件名称" prop="filename"></el-table-column>
                  <el-table-column label="风景图片">
                    <template slot-scope="scope">
                      <el-tooltip content="点击查看图片" placement="right" effect="light">
                        <img :src="scope.row.fid | fileurl" alt="" height="55px" width="110px" @click="showfjtp(scope.row)" />
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column label="文件描述" prop="fileinfo"></el-table-column>
                  <el-table-column label="最后修改时间" sortable prop="lastupdate">
                    <template slot-scope="scope">
                      {{ scope.row.lastupdate | formatDate }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="socpe">
                      <el-button type="success" plain icon="el-icon-search" v-if="isImage(socpe.row)" @click="showfjtp(socpe.row)">预览</el-button>
                      <el-button type="primary" plain icon="el-icon-download" @click="downloadfjtp(socpe.row)"></el-button>
                      <el-button type="danger" plain icon="el-icon-delete" @click="delfjtp(socpe.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <page :page="fjtpPage" @page-change="queryFjtp" v-loading="fjtploading" class="pg"></page>
              </div>
            </el-tab-pane>
            <el-tab-pane label="图片信息">
              <span slot="label"><i class="el-icon-document"> 图片信息</i></span>
              <div class="classhd">图片信息</div>

              <div class="query-btn">
                <div>
                  <el-button type="success" icon="el-icon-plus" @click="openaddfjtpxx = true">添加</el-button>
                </div>
                <div>
                  <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNewfjtpxx">刷新</el-button>
                </div>
              </div>
              <div>
                <el-table :data="fjtpxxlist" stripe v-loading="fjtpxxloading" height="420">
                  <el-table-column label="信息分组" prop="messageGroup"></el-table-column>
                  <el-table-column label="信息关键词" prop="messageKey"></el-table-column>
                  <el-table-column label="对应的展示图片">
                    <template slot-scope="socpe">
                      <el-tooltip content="点击查看图片" placement="right" effect="light">
                        <img :src="getUrl(socpe.row)" alt="" height="55px" width="110px" @click="ckimg(socpe.row)" />
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column label="最后修改时间" sortable prop="lastupdate">
                    <template slot-scope="scope">
                      {{ scope.row.lastupdate | formatDate }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="socpe">
                      <el-button type="success" size="medium" plain icon="el-icon-search" @click="ckfjtpxx(socpe.row)">查看</el-button>
                      <el-button type="primary" size="medium" plain icon="el-icon-edit" @click="showupdatefjtpxx(socpe.row)">编辑</el-button>
                      <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="delfjtpxx(socpe.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <page :page="fjtpxxPage" @page-change="queryFjtpxx" class="pg" v-loading="fjtpxxloading"></page>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <!-- 更新日志 -->
      <el-tab-pane label="更新日志">
        <span slot="label"><i class="el-icon-folder-opened"> 更新日志</i></span>
        <div>
          <!-- <el-tabs :tab-position="(tabPosition = 'left')" style="height: 500px;"> -->
          <!-- <el-tab-pane label="活动信息"> -->
          <!-- <span slot="label"><i class="el-icon-tickets"> 活动信息</i></span> -->
          <div class="classhd">日志信息</div>

          <div class="query-btn">
            <div>
              <el-input v-model="queryInfo.activeTime" placeholder="日期模糊查询"></el-input>
            </div>
            <div>
              <el-input v-model="queryInfo.activeTitle" placeholder=" 标题模糊查询"></el-input>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-search" @click="queryActive">查询</el-button>
            </div>
            <div>
              <el-button type="success" icon="el-icon-plus" @click="openadd = true">添加活动</el-button>
            </div>
            <div>
              <el-button type="success" icon="el-icon-plus" @click="openaddactivetp = true">添加活动图片</el-button>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNew">刷新</el-button>
            </div>
          </div>
          <div>
            <el-table :data="activelist" stripe v-loading="activeloading" height="460">
              <el-table-column label="活动编号" prop="paid"></el-table-column>
              <el-table-column label="日期" prop="activeTime" sortable>
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.activeTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="标题" prop="activeTitle"></el-table-column>
              <el-table-column label="最后修改时间" sortable prop="lastupdate">
                <template slot-scope="scope">
                  {{ scope.row.lastupdate | formatDate }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="socpe">
                  <el-button type="success" size="medium" plain icon="el-icon-search" @click="ck(socpe.row)">信息</el-button>
                  <el-button type="success" size="medium" plain icon="el-icon-search" @click="selectActiveImg(socpe.row)">图片</el-button>
                  <br />
                  <el-button type="primary" size="medium" plain icon="el-icon-edit" @click="showupdate(socpe.row)">编辑</el-button>
                  <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="del(socpe.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <page :page="activePage" @page-change="queryActive" v-loading="activeloading" class="pg"></page>
          </div>
          <!-- </el-tab-pane> -->
          <!-- </el-tabs> -->
        </div>
      </el-tab-pane>
      <!-- 一些话 -->
      <el-tab-pane label="一些话">
        <span slot="label"><i class="el-icon-chat-line-round"> 一些话</i></span>
        <div>
          <div class="classhd">一些话</div>

          <div class="query-btn">
            <div>
              <el-button type="success" icon="el-icon-plus" @click="openaddyxh = true">添加</el-button>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-refresh-right" round @click="queryNewyxh">刷新</el-button>
            </div>
          </div>
          <div>
            <el-table :data="yxhlist" stripe v-loading="yxhloading" height="340">
              <el-table-column label="信息分组" prop="messageGroup"></el-table-column>
              <el-table-column label="信息关键词" prop="messageKey"></el-table-column>
              <el-table-column label="最后修改时间" sortable prop="lastupdate">
                <template slot-scope="scope">
                  {{ scope.row.lastupdate | formatDate }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="socpe">
                  <el-button type="success" plain icon="el-icon-search" @click="ckyxh(socpe.row)">查看</el-button>
                  <el-button type="primary" plain icon="el-icon-edit" @click="showupdateyxh(socpe.row)">编辑</el-button>
                  <el-button type="danger" plain icon="el-icon-delete" @click="delyxh(socpe.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <page :page="yxhPage" @page-change="queryYxh" class="pg" v-loading="yxhloading"></page>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加活动的对话框 -->
    <div>
      <el-dialog :visible.sync="openadd" :close-on-click-modal="false" title="添加活动">
        <el-form>
          <el-form-item>
            日期：
            <el-date-picker v-model="addInfo.activeTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="addInfo.activeTitle" placeholder="标题" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="addInfo.activeInfo" placeholder="内容描述" type="textarea" autosize clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="add">添加</el-button>
            <el-button @click="resetadd">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改活动的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdate" :close-on-click-modal="false" title="修改活动">
        <div>
          <el-form>
            <el-form-item>
              日期：
              <el-date-picker v-model="updateInfo.activeTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input v-model="updateInfo.activeTitle" placeholder="标题" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="updateInfo.activeInfo" placeholder="描述" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="update">保存</el-button>
              <el-button @click="openupdate = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 查看活动的对话框 -->
    <div>
      <el-dialog :visible.sync="openck" :close-on-click-modal="false" title="查看活动">
        <el-form>
          <el-form-item label="日期：">
            <span>{{ cklist.activeTime }}</span>
          </el-form-item>
          <el-form-item label="标题：">
            <span>{{ cklist.activeTitle }}</span>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input v-model="cklist.activeInfo" placeholder="描述" type="textarea" autosize clearable></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 添加风景标题的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddfjbt" :close-on-click-modal="false" title="添加标题">
        <el-form>
          <el-form-item label="信息分组：">
            <el-input v-model="addInfofjbt.messageGroup" placeholder="信息分组"></el-input>
          </el-form-item>
          <el-form-item label="信息关键字：">
            <el-input v-model="addInfofjbt.messageKey" placeholder="信息关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="内容描述：">
            <el-input v-model="addInfofjbt.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addfjbt">添加</el-button>
            <el-button @click="resetaddfjbt">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改风景标题的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdatefjbt" :close-on-click-modal="false" title="修改标题">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <el-input v-model="updateInfofjbt.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <el-input v-model="updateInfofjbt.messageKey" placeholder="信息关键词" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item label="内容描述：">
              <el-input v-model="updateInfofjbt.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="updatefjbt">保存</el-button>
              <el-button @click="openupdatefjbt = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 查看风景标题的对话框 -->
    <div>
      <el-dialog :visible.sync="openckfjbt" :close-on-click-modal="false" title="查看标题">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <span>{{ ckfjbtlist.messageGroup }}</span>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <span>{{ ckfjbtlist.messageKey }}</span>
            </el-form-item>
            <el-form-item label="信息内容：">
              <el-input v-model="ckfjbtlist.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 添加风景图片的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddfjtp" :close-on-click-modal="false" title="添加风景图片">
        <el-form>
          <el-form-item label="文件描述：">
            <el-input v-model="addInfofjtp.fileinfo" placeholder="文件描述："></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="openFile">选择文件...</el-button>
            <span v-if="file">&nbsp;{{ file.name }}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addfjtp">添加</el-button>
            <el-button @click="resetaddfjtp">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 预览风景图片的对话框 -->
    <div>
      <el-dialog top="5rem" title="风景图片预览" :visible.sync="ckfjtp">
        <div class="show-img">
          <img :src="imgUrl" alt="" />
        </div>
      </el-dialog>
    </div>

    <!-- 添加图片信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddfjtpxx" :close-on-click-modal="false" title="添加图片信息">
        <el-form>
          <el-form-item label="信息分组：">
            <el-input v-model="addInfofjtpxx.messageGroup" placeholder="信息分组"></el-input>
          </el-form-item>
          <el-form-item label="信息关键字：">
            <el-input v-model="addInfofjtpxx.messageKey" placeholder="信息关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择文件：">
            <el-button @click="fileVisible03 = true">浏览文件</el-button>
          </el-form-item>
          <el-form-item label="内容描述：">
            <el-input v-model="addInfofjtpxx.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addfjtpxx">添加</el-button>
            <el-button @click="resetaddfjtpxx">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 浏览文件选择文件的对话框 -->
    <div>
      <el-dialog top="3rem" :close-on-click-modal="false" :visible.sync="fileVisible03" title="文件选择对话框">
        <div>
          <file-choose @file-selected="fileSelected01"></file-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 修改图片信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdatefjtpxx" :close-on-click-modal="false" title="修改图片信息">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <el-input v-model="updateInfofjtpxx.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <el-input v-model="updateInfofjtpxx.messageKey" placeholder="信息关键词" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item label="选择文件：">
              <el-button @click="fileVisible04 = true">浏览文件</el-button>
            </el-form-item>
            <el-form-item label="信息内容：">
              <el-input v-model="updateInfofjtpxx.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="updatefjtpxx">保存</el-button>
              <el-button @click="openupdatefjtpxx = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 浏览文件选择文件的对话框 -->
    <div>
      <el-dialog top="3rem" :close-on-click-modal="false" :visible.sync="fileVisible04" title="文件选择对话框">
        <div>
          <file-choose @file-selected="fileSelected02"></file-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 查看图片信息的对话框 -->
    <div>
      <el-dialog :visible.sync="openckfjtpxx" :close-on-click-modal="false" title="查看图片信息">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <span>{{ ckfjtpxxlist.messageGroup }}</span>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <span>{{ ckfjtpxxlist.messageKey }}</span>
            </el-form-item>
            <el-form-item label="信息内容：">
              <el-input v-model="ckfjtpxxlist.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 查看图片的对话框 -->
    <div>
      <el-dialog top="5rem" title="图片预览" :visible.sync="ckfjtp01">
        <div class="show-img">
          <img :src="imgUrl02" alt="" />
        </div>
      </el-dialog>
    </div>

    <!-- 添加一些话的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddyxh" :close-on-click-modal="false" title="添加一些话">
        <el-form>
          <el-form-item label="信息分组：">
            <el-input v-model="addInfoyxh.messageGroup" placeholder="信息分组"></el-input>
          </el-form-item>
          <el-form-item label="信息关键字：">
            <el-input v-model="addInfoyxh.messageKey" placeholder="信息关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="内容描述：">
            <el-input v-model="addInfoyxh.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addyxh">添加</el-button>
            <el-button @click="resetaddyxh">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 修改一些话的对话框 -->
    <div>
      <el-dialog :visible.sync="openupdateyxh" :close-on-click-modal="false" title="修改一些话">
        <div>
          <el-form>
            <el-form-item>
              <el-input v-model="updateInfoyxh.messageGroup" placeholder="信息分组" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="updateInfoyxh.messageKey" placeholder="信息关键词" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="updateInfoyxh.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="updateyxh">保存</el-button>
              <el-button @click="openupdateyxh = false">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 查看一些话的对话框 -->
    <div>
      <el-dialog :visible.sync="openckyxh" :close-on-click-modal="false" title="查看一些话">
        <div>
          <el-form>
            <el-form-item label="信息分组：">
              <span>{{ ckyxhlist.messageGroup }}</span>
            </el-form-item>
            <el-form-item label="信息关键词：">
              <span>{{ ckyxhlist.messageKey }}</span>
            </el-form-item>
            <el-form-item label="信息内容：">
              <el-input v-model="ckyxhlist.message" placeholder="信息内容" type="textarea" autosize clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 添加活动图片的对话框 -->
    <div>
      <el-dialog :visible.sync="openaddactivetp" :close-on-click-modal="false" title="添加活动图片">
        <el-form>
          <el-form-item label="文件编号：">
            <el-input v-model="addInfotp.fid" placeholder="文件编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择文件：">
            <el-button @click="fileVisible = true">浏览文件</el-button>
          </el-form-item>
          <el-form-item label="图片信息描述：">
            <el-input v-model="addInfotp.imgInfo" placeholder="图片描述信息" type="textarea" autosize clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-form-item label="活动编号：">
              <el-input v-model="addInfotp.paid" placeholder="活动编号" clearable></el-input>
            </el-form-item>
            <el-form-item label="选择活动：">
              <el-button @click="fileVisible01 = true">浏览活动</el-button>
            </el-form-item>
            <el-button type="success" @click="addtp">添加</el-button>
            <el-button @click="resetaddtp">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 浏览文件选择文件的对话框 -->
    <div>
      <el-dialog top="3rem" :close-on-click-modal="false" :visible.sync="fileVisible" title="文件选择对话框">
        <div>
          <file-choose @file-selected="fileSelected"></file-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 浏览活动选择活动的对话框 -->
    <div>
      <el-dialog :close-on-click-modal="false" :visible.sync="fileVisible01" title="活动选择对话框">
        <div>
          <active-choose @active-selected="activeSelected"></active-choose>
        </div>
      </el-dialog>
    </div>

    <!-- 查看活动图片的对话框 -->
    <div>
      <el-dialog :close-on-click-modal="false" :visible.sync="fileVisible02" title="查看活动图片">
        <div>
          <active-img-choose :info.sync="activeinfo"></active-img-choose>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from '../../components/Page';
import tools from '../../js/tools';
import FileChoose from '../../components/FileChoose';
import ActiveChoose from '../../components/ActiveChoose';
import ActiveImgChoose from '../../components/ActiveImg';
export default {
  components: { Page, FileChoose, ActiveChoose, ActiveImgChoose },
  name: 'Index',
  data() {
    return {
      // 全局loading
      loading: false,
      // 班级活动、活动日志信息
      activeloading: false,
      queryInfo: {
        accessKey: this.$accessKey,
        paid: -1,
        activeTime: '',
        activeTitle: ''
      },
      activelist: [],
      activePage: {
        pageSize: 4,
        pageNumber: 1
      },
      addInfo: {
        accessKey: this.$accessKey,
        activeInfo: '',
        activeTime: '',
        activeTitle: ''
      },
      openadd: false,
      openck: false,
      cklist: {},
      openupdate: false,
      updateInfo: {},
      // 风景标题
      fjbtlist: [],
      fjbtPage: {
        pageSize: 4,
        pageNumber: 1
      },
      fjbtloading: false,
      openaddfjbt: false,
      addInfofjbt: {
        accessKey: this.$accessKey,
        messageGroup: 'indexfjbt',
        messageKey: 'fjbt',
        message: ''
      },
      openckfjbt: false,
      ckfjbtlist: {},
      openupdatefjbt: false,
      updateInfofjbt: {},
      // 风景图片
      fjtplist: [],
      fjtploading: false,
      fjtpPage: {
        pageSize: 4,
        pageNumber: 1
      },
      queryInfofjtp: {
        fileinfo: '风景',
        filename: '',
        contentType: ''
      },
      openaddfjtp: false,
      file: null,
      addInfofjtp: {
        fileinfo: '风景图片'
      },
      imgUrl: '',
      ckfjtp: false,
      // 风景图片信息
      fjtpxxlist: [],
      fjtpxxPage: {
        pageSize: 4,
        pageNumber: 1
      },
      fjtpxxloading: false,
      openaddfjtpxx: false,
      addInfofjtpxx: {
        accessKey: this.$accessKey,
        messageGroup: 'indexfjtpxx',
        messageKey: '',
        message: ''
      },
      openckfjtpxx: false,
      ckfjtpxxlist: {},
      imgUrl02: '',
      ckfjtp01: false,
      openupdatefjtpxx: false,
      updateInfofjtpxx: {},
      fileVisible03: false,
      fileVisible04: false,
      // 一些话
      yxhlist: [],
      yxhPage: {
        pageSize: 4,
        pageNumber: 1
      },
      yxhloading: false,
      openaddyxh: false,
      addInfoyxh: {
        accessKey: this.$accessKey,
        messageGroup: 'indexyxh',
        messageKey: 'yxh',
        message: ''
      },
      openckyxh: false,
      ckyxhlist: {},
      openupdateyxh: false,
      updateInfoyxh: {},
      // 班级活动，更新日志图片
      openaddactivetp: false,
      addInfotp: {
        accessKey: this.$accessKey,
        fid: '',
        imgInfo: '',
        paid: ''
      },
      fileVisible: false,
      fileVisible01: false,
      fileVisible02: false,
      activeinfo: {}
    };
  },
  methods: {
    // 修改风景图片信息选择文件的方法
    fileSelected02(file) {
      this.updateInfofjtpxx.messageKey = file.fid;
      this.fileVisible04 = false;
    },
    // 添加风景图片信息选择文件的方法
    fileSelected01(file) {
      this.addInfofjtpxx.messageKey = file.fid;
      this.fileVisible03 = false;
    },
    // 查看活动图片的方法
    selectActiveImg(info) {
      this.fileVisible02 = true;
      this.activeinfo = info;
    },
    // 重置活动图片添加的表单的方法
    resetaddtp() {
      this.addInfotp = {
        accessKey: this.$accessKey,
        fid: '',
        imgInfo: '',
        paid: ''
      };
    },
    // 添加活动图片的方法
    addtp() {
      if (this.addInfotp.fid == '') {
        this.$message({
          message: '文件编号必须填写!',
          type: 'warning'
        });

        return;
      }
      if (this.addInfotp.imgInfo == '') {
        this.$message({
          message: '图片描述信息必须填写!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfotp.paid == '') {
        this.$message({
          message: '活动编号必须填写!',
          type: 'warning'
        });
        return;
      }
      this.$ajax(
        '/portable/active/imgaes/add',
        {
          tbPortableActiveImages: this.addInfotp
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '添加失败，' + data.message,
              type: 'success'
            });
            return;
          }
          this.openaddactivetp = false;
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          this.addInfotp = {
            accessKey: this.$accessKey,
            fid: '',
            imgInfo: '',
            paid: ''
          };
          this.queryNew();
        }
      );
    },
    // 选择活动的方法
    activeSelected(info) {
      this.addInfotp.paid = info.paid;
      this.fileVisible01 = false;
    },
    // 添加活动信息选择文件的方法
    fileSelected(file) {
      this.addInfotp.fid = file.fid;
      this.fileVisible = false;
    },
    // 刷新一些话页面的方法
    queryNewyxh() {
      this.yxhPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryYxh();
    },
    // 获取一些话修改数据的方法
    showupdateyxh(info) {
      this.openupdateyxh = true;
      this.updateInfoyxh = JSON.parse(JSON.stringify(info));
    },
    // 修改一些话息的方法
    updateyxh() {
      this.$ajax(
        '/portable/message/update',
        {
          tbPortableMessage: this.updateInfoyxh
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '修改失败',
              type: 'success'
            });
            return;
          }
          this.openupdateyxh = false;
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          this.queryYxh();
        }
      );
      this.queryYxh();
    },
    // 删除一些话的方法
    delyxh(info) {
      this.$confirm('是否删除此项话?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(
            '/portable/message/delete',
            {
              tbPortableMessage: {
                accessKey: this.$accessKey,
                pmid: info.pmid
              }
            },
            function(data) {
              if (!data.success) {
                this.$notify.error({
                  title: '失败',
                  message: '删除失败',
                  type: 'success'
                });
                return;
              }
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.queryYxh();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 查看一些话的方法
    ckyxh(info) {
      this.openckyxh = true;
      this.ckyxhlist = JSON.parse(JSON.stringify(info));
    },
    // 重置一些话添加表单的方法
    resetaddyxh() {
      this.addInfoyxh = {
        accessKey: this.$accessKey,
        messageGroup: 'indexyxh',
        messageKey: 'yxh',
        message: ''
      };
    },
    // 添加一些话的方法
    addyxh() {
      if (this.addInfoyxh.messageGroup == '') {
        this.$message({
          message: '信息分组必须填写!',
          type: 'warning'
        });

        return;
      }
      if (this.addInfoyxh.messageKey == '') {
        this.$message({
          message: '信息关键词必须填写!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfoyxh.message == '') {
        this.$message({
          message: '内容描述必须填写!',
          type: 'warning'
        });
        return;
      }
      this.$ajax(
        '/portable/message/add',
        {
          tbPortableMessage: this.addInfoyxh
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '添加失败，同一个分组信息关键词不能相同！！！',
              type: 'success'
            });
            return;
          }
          this.openaddyxh = false;
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          this.addInfoyxh = {
            accessKey: this.$accessKey,
            messageGroup: 'indexyxh',
            messageKey: 'yxh',
            message: ''
          };
          this.queryYxh();
        }
      );
    },
    // 查询一些话息的方法
    queryYxh() {
      this.$ajax(
        '/portable/message/queryAll',
        {
          tbPortableMessage: {
            accessKey: this.$accessKey,
            messageGroup: 'indexyxh'
          },
          page: this.yxhPage
        },
        function(data) {
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.yxhlist = data.resultData.list;
          this.yxhPage = data.resultData.page;
        }
      );
      this.yxhloading = true;
      setTimeout(() => {
        this.yxhloading = false;
      }, 200);
    },
    // 刷新风景图片信息页面的方法
    queryNewfjtpxx() {
      this.fjtpxxPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryFjtpxx();
    },
    // 获取风景图片信息修改数据的方法
    showupdatefjtpxx(info) {
      this.openupdatefjtpxx = true;
      this.updateInfofjtpxx = JSON.parse(JSON.stringify(info));
    },
    // 修改风景图片信息的方法
    updatefjtpxx() {
      this.$ajax(
        '/portable/message/update',
        {
          tbPortableMessage: this.updateInfofjtpxx
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '修改失败，' + data.message,
              type: 'success'
            });
            return;
          }
          this.openupdatefjtpxx = false;
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          this.queryFjtpxx();
        }
      );
      this.queryFjtpxx();
    },
    // 删除风景图片信息的方法
    delfjtpxx(info) {
      this.$confirm('是否删除此图片信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(
            '/portable/message/delete',
            {
              tbPortableMessage: {
                accessKey: this.$accessKey,
                pmid: info.pmid
              }
            },
            function(data) {
              if (!data.success) {
                this.$notify.error({
                  title: '失败',
                  message: '删除失败',
                  type: 'success'
                });
                return;
              }
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.queryFjtpxx();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 查看风景图片信息的方法
    ckfjtpxx(info) {
      this.openckfjtpxx = true;
      this.ckfjtpxxlist = JSON.parse(JSON.stringify(info));
    },
    // 重置风景图片信息添加表单的方法
    resetaddfjtpxx() {
      this.addInfofjtpxx = {
        accessKey: this.$accessKey,
        messageGroup: 'indexfjtpxx',
        messageKey: '',
        message: ''
      };
    },
    // 添加风景图片信息的方法
    addfjtpxx() {
      if (this.addInfofjtpxx.messageGroup == '') {
        this.$message({
          message: '信息分组必须填写!',
          type: 'warning'
        });

        return;
      }
      if (this.addInfofjtpxx.messageKey == '') {
        this.$message({
          message: '信息关键词必须填写!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfofjtpxx.message == '') {
        this.$message({
          message: '内容描述必须填写!',
          type: 'warning'
        });
        return;
      }
      this.$ajax(
        '/portable/message/add',
        {
          tbPortableMessage: this.addInfofjtpxx
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '添加失败，同一个分组信息关键词不能相同！！！',
              type: 'success'
            });
            return;
          }
          this.openaddfjtpxx = false;
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          this.addInfofjtpxx = {
            accessKey: this.$accessKey,
            messageGroup: 'indexfjtpxx',
            messageKey: '',
            message: ''
          };
          this.queryFjtpxx();
        }
      );
    },
    // 查看图片的方法
    ckimg(info) {
      this.ckfjtp01 = true;
      this.imgUrl02 = this.$getDownloadUrl(info.messageKey);
    },
    // 获取图片连接的方法
    getUrl(info) {
      return this.$getDownloadUrl(info.messageKey);
    },
    // 查询风景图片信息的方法
    queryFjtpxx() {
      this.$ajax(
        '/portable/message/queryAll',
        {
          tbPortableMessage: {
            accessKey: this.$accessKey,
            messageGroup: 'indexfjtpxx'
          },
          page: this.fjtpxxPage
        },
        function(data) {
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.fjtpxxlist = data.resultData.list;
          this.fjtpxxPage = data.resultData.page;
        }
      );
      this.fjtpxxloading = true;
      setTimeout(() => {
        this.fjtpxxloading = false;
      }, 200);
    },
    // 删除图片的方法
    delfjtp(file) {
      this.$confirm('是否删除此图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(
            '/file/delete',
            {
              'tbFile.fid': file.fid
            },
            function(data) {
              if (!data.success) {
                this.$notify.error({
                  title: '失败',
                  message: '删除失败',
                  type: 'success'
                });
                return;
              }
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.queryFjtp();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 判断是否是图片的方法
    isImage(file) {
      return file.contentType.substr(0, 6) == 'image/';
    },
    // 查看风景图片的方法
    showfjtp(file) {
      this.ckfjtp = true;
      this.imgUrl = this.$getDownloadUrl(file.fid);
    },
    // 下载风景图片的方法
    downloadfjtp(info) {
      window.open(this.$getDownloadUrl(info.fid));
    },
    // 重置风景图片添加表单的方法
    resetaddfjtp() {
      this.addInfofjtp = {
        fileinfo: '风景图片'
      };
      this.file = null;
    },
    // 获取风景图片的文件的方法
    openFile() {
      let app = this;
      tools.openFile(function(file) {
        app.file = file;
      });
    },
    // 添加风景图片的方法
    addfjtp() {
      let app = this;
      if (this.addInfofjtp.fileinfo == '') {
        app.$message({
          message: '文件描述必须填写!',
          type: 'warning'
        });
        return;
      }
      if (app.file == null) {
        app.$message({
          message: '必须选择一个文件!',
          type: 'warning'
        });
        return;
      }
      app.$sendFile(
        '/file/upload',
        app.file,
        {
          'tbFile.fileinfo': this.addInfofjtp.fileinfo
        },
        function(data) {
          // app.$message(data.message);
          if (!data.success) {
            app.$notify.error({
              title: '失败',
              message: '添加失败,' + data.message,
              type: 'success'
            });
            app.resetaddfjtp();
            return;
          }
          app.$message(data.message);
          app.openaddfjtp = false;
          app.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          app.resetaddfjtp();
          app.queryFjtp();
        }
      );
    },
    // 刷新风景图片页面的方法
    queryNewfjtp() {
      this.fjtpPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryFjtp();
    },
    // 查询风景图片的方法
    queryFjtp() {
      this.$ajax(
        '/file/query',
        {
          tbFile: this.queryInfofjtp,
          page: this.fjtpPage
        },
        function(data) {
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.fjtplist = data.resultData.list;
          this.fjtpPage = data.resultData.page;
        }
      );
      this.fjtploading = true;
      setTimeout(() => {
        this.fjtploading = false;
      }, 200);
    },
    // 刷新风景标题页面的方法
    queryNewfjbt() {
      this.fjbtPage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryFjbt();
    },
    // 获取风景标题修改数据的方法
    showupdatefjbt(info) {
      this.openupdatefjbt = true;
      this.updateInfofjbt = JSON.parse(JSON.stringify(info));
    },
    // 修改风景标题的方法
    updatefjbt() {
      this.$ajax(
        '/portable/message/update',
        {
          tbPortableMessage: this.updateInfofjbt
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '修改失败',
              type: 'success'
            });
            return;
          }
          this.openupdatefjbt = false;
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          this.queryFjbt();
        }
      );
      this.queryFjbt();
    },
    // 删除风景标题的方法
    delfjbt(info) {
      this.$confirm('是否删除此标题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(
            '/portable/message/delete',
            {
              tbPortableMessage: {
                accessKey: this.$accessKey,
                pmid: info.pmid
              }
            },
            function(data) {
              if (!data.success) {
                this.$notify.error({
                  title: '失败',
                  message: '删除失败',
                  type: 'success'
                });
                return;
              }
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.queryFjbt();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 查看风景标题的方法
    ckfjbt(info) {
      this.openckfjbt = true;
      this.ckfjbtlist = JSON.parse(JSON.stringify(info));
    },
    // 重置风景标题添加表单的方法
    resetaddfjbt() {
      this.addInfofjbt = {
        accessKey: this.$accessKey,
        messageGroup: 'index',
        messageKey: 'fjbt',
        message: ''
      };
    },
    // 添加风景标题的方法
    addfjbt() {
      if (this.addInfofjbt.messageGroup == '') {
        this.$message({
          message: '信息分组必须填写!',
          type: 'warning'
        });

        return;
      }
      if (this.addInfofjbt.messageKey == '') {
        this.$message({
          message: '信息关键词必须填写!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfofjbt.message == '') {
        this.$message({
          message: '内容描述必须填写!',
          type: 'warning'
        });
        return;
      }
      this.$ajax(
        '/portable/message/add',
        {
          tbPortableMessage: this.addInfofjbt
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '添加失败，同一个分组信息关键词不能相同！！！',
              type: 'success'
            });
            return;
          }
          this.openaddfjbt = false;
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          this.addInfofjbt = {
            accessKey: this.$accessKey,
            messageGroup: 'index',
            messageKey: 'fjbt',
            message: ''
          };
          this.queryFjbt();
        }
      );
    },
    // 查询风景标题的方法
    queryFjbt() {
      this.$ajax(
        '/portable/message/queryAll',
        {
          tbPortableMessage: {
            accessKey: this.$accessKey,
            messageGroup: 'indexfjbt'
          },
          page: this.fjbtPage
        },
        function(data) {
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.fjbtlist = data.resultData.list;
          this.fjbtPage = data.resultData.page;
        }
      );
      this.fjbtloading = true;
      setTimeout(() => {
        this.fjbtloading = false;
      }, 200);
    },
    // 刷新活动信息页面的方法
    queryNew() {
      this.activePage = {
        pageSize: 4,
        pageNumber: 1
      };
      this.queryInfo = {
        accessKey: this.$accessKey,
        activeTime: '',
        activeTitle: ''
      };
      this.queryActive();
    },
    // 获取活动信息修改数据的方法
    showupdate(info) {
      this.openupdate = true;
      this.updateInfo = JSON.parse(JSON.stringify(info));
    },
    // 修改活动信息的方法
    update() {
      this.$ajax(
        '/portable/active/update',
        {
          tbPortableActive: this.updateInfo
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '修改失败',
              type: 'success'
            });
            return;
          }
          this.openupdate = false;
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          this.queryActive();
        }
      );
      this.queryActive();
    },
    // 删除活动信息的方法
    del(info) {
      this.$confirm('是否删除此活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(
            '/portable/active/delete',
            {
              tbPortableActive: {
                accessKey: this.$accessKey,
                paid: info.paid
              }
            },
            function(data) {
              if (!data.success) {
                this.$notify.error({
                  title: '失败',
                  message: '删除失败',
                  type: 'success'
                });
                return;
              }
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.queryActive();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 查看活动信息的方法
    ck(info) {
      this.openck = true;
      this.cklist = JSON.parse(JSON.stringify(info));
    },
    // 重置活动信息添加表单的方法
    resetadd() {
      this.addInfo = {
        activeInfo: '',
        activeTime: '',
        activeTitle: ''
      };
    },
    // 添加活动信息的方法
    add() {
      if (this.addInfo.activeTime == '') {
        this.$message({
          message: '日期必须填写!',
          type: 'warning'
        });

        return;
      }
      if (this.addInfo.activeTitle == '') {
        this.$message({
          message: '标题必须填写!',
          type: 'warning'
        });
        return;
      }
      if (this.addInfo.activeInfo == '') {
        this.$message({
          message: '内容描述必须填写!',
          type: 'warning'
        });
        return;
      }
      this.$ajax(
        '/portable/active/add',
        {
          tbPortableActive: this.addInfo
        },
        function(data) {
          if (!data.success) {
            this.$notify.error({
              title: '失败',
              message: '添加失败',
              type: 'success'
            });
            return;
          }
          this.openadd = false;
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          });
          this.addInfo = {
            accessKey: this.$accessKey,
            activeInfo: '',
            activeTime: '',
            activeTitle: ''
          };
          this.queryActive();
        }
      );
    },
    // 查询活动信息的方法
    queryActive() {
      this.$ajax(
        '/portable/active/queryAll',
        {
          tbPortableActive: this.queryInfo,
          page: this.activePage
        },
        function(data) {
          // console.log(data);
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.activelist = data.resultData.list;
          this.activePage = data.resultData.page;
        }
      );
      this.activeloading = true;
      setTimeout(() => {
        this.activeloading = false;
      }, 200);
    },
    // 首页管理界面加载的方法
    queryAll() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    rtindex() {
      this.$router.push('/back/backindex');
    }
  },
  created() {
    // 页面刷新出发的查询
    this.queryAll();
    this.queryActive();
    this.queryFjbt();
    this.queryFjtp();
    this.queryFjtpxx();
    this.queryYxh();
  }
};
</script>
<style>
body {
  overflow: hidden;
}

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
  padding: 0.2rem 4rem 0.2rem 0rem;
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

.query-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin-right: 3rem;
}

.query-btn div {
  padding: 0.5rem;
}

.pg {
  padding: 1rem;
  text-align: center;
}

.ck-info {
  font-size: 1.2rem;
}

.ck-info div {
  margin: 1rem;
}

.show-img img {
  display: flex;
  width: 100%;
  height: auto;
}
</style>
