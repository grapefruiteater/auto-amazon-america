import React from 'react'
import { Auth } from 'aws-amplify'
import '../../scss/style.scss'
import {
  CForm,
  CFormLabel,
  CFormTextarea,
  CCol,
  CFormInput,
  CInputGroup,
  CRow,
  CAlert,
  CSpinner,
  CFormCheck,
} from '@coreui/react'

const Dashboard = () => {
  const [user, setUser] = React.useState(' ')
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const code = `
    ASIN
    B097B2YWFX
    B0BV94KXFR
  `

  return (
    <div>
      <h3 className="h3styletop">はじめに</h3>
      <p style={{ margin: '15px' }}>
        <strong>
          他国間Amazon販売管理ツール&ensp;
          <span style={{ color: '#7d0015' }}>Auto Amazon-Export</span>
          &ensp;へようこそ。
          <br />
          Auto&ensp;Amazon-Exportは日本と外国のAmazon商品情報を取得し、ユーザーが設定した条件を満たす商品のみを抽出し、自身の外国Amazonセラーアカウントへ出品を行うツールです。
        </strong>
      </p>
      {/*<p style={{ fontSize: 22 }}>ようこそ! {user.username}さん</p>*/}
      <h3 className="h3style">利用規約のご案内</h3>
      <p style={{ color: '#7d0015', margin: '15px' }}>
        <strong>
          本サービスを使用する前に、下記利用規約をよくお読みください。本利用規約に同意しない場合は、本サービスを使用しないでください。
        </strong>
      </p>
      <h4 style={{ margin: '15px' }}>利用規約 (簡略)</h4>
      <ul className="ulstyle">
        <li className="listyle">
          <p>
            本サービスの利用を希望する者（以下「登録希望者」）は、本利用規約を遵守することに同意し、かつ登録事項を当社に提供することにより、本サービスの利用を登録する必要があります。
          </p>
        </li>
        <li className="listyle">
          <p>
            本サービスはすべてのユーザーに有償で提供されます。支払期日から30日以内に支払いが行われていない場合、利用を一時的に停止する場合があります。
          </p>
        </li>
        <li className="listyle">
          <p>
            当社は、ユーザーが、以下の各号のいずれかの事由に該当する場合は、事前に通知または催告することなく、投稿データを削除もしくは非表示にし、当該ユーザーについて本サービスの利用を一時的に停止し、またはユーザーとしての登録を抹消することができます。
          </p>
          <ol className="olstyle">
            <li>本規約のいずれかの条項に違反した場合</li>
            <li>登録事項に虚偽の事実があることが判明した場合</li>
            <li>
              支払停止もしくは支払不能となり、または破産手続開始、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあった場合
            </li>
            <li>24ヶ月以上本サービスの利用がない場合</li>
            <li>
              その他、当社が本サービスの利用または登録ユーザーとしての登録の継続を適当でないと判断した場合
            </li>
          </ol>
        </li>
        <li className="listyle">
          <p>本サービスの使用によって生じたいかなる損害についても当社は責任は負いません。</p>
        </li>
        <li className="listyle">
          <p>本サービスのコンテンツや機能は、予告なく変更または中止される場合があります。</p>
        </li>
        <li className="listyle">
          <p>
            本サービスは、個人情報保護法に基づき適切な方法で管理されます。ただし、本サービスを使用することで入力された情報の正確性や安全性については、保証しません。
          </p>
        </li>
        <li className="listyle">
          <p>
            本サービスの利用に際しては、適切な利用方法に従ってください。不正な目的での利用や、第三者の権利を侵害する行為は禁止されています。
          </p>
        </li>
        <li className="listyle">
          <p>
            本サービスの利用に関する問い合わせやトラブルが生じた場合は、運営者にご連絡ください。
          </p>
        </li>
        <li className="listyle">
          <p>
            利用規約は、運営者の判断により、いつでも変更または更新される場合があります。変更された場合は、当該ページに掲載された最新の利用規約が適用されます。
          </p>
        </li>
        <li className="listyle">
          <p>
            利用規約に定めのない事項については、日本国の法律に基づき解釈されます。また、本利用規約に関する一切の紛争については、日本国の裁判所が専属的な管轄権を有します。
          </p>
        </li>
      </ul>

      <h3 className="h3style">マニュアル</h3>
      <h4 style={{ margin: '15px' }}>1. 事前準備</h4>
      <ul className="ulstyle">
        <li className="listyle">
          <h5>パラメーター</h5>
        </li>
        <p>出品価格の設定や送料の種類・パターン、利益率や差額削除の利益パターンの設定をします。</p>
        <li className="listyle">
          <h5>フィルタリング</h5>
        </li>
        <p>
          商品情報から除外ワード(ブラックリスト)の設定や重量・サイズ・セラー数・出品価格によるフィルタリング設定をします。
          <br />
          ブラックリストは、キーワード・タイトルは部分一致、それ以外は完全一致でフィルタリングします。
        </p>
        <li className="listyle">
          <h5> SP-API キー設定</h5>
        </li>
        <p>
          日本と他国のSP-APIキー(LWAアプリID、LWAクライアントシークレット、リフレッシュトークン)の設定を行う。
        </p>
      </ul>

      <h4 style={{ margin: '15px' }}>2. 商品情報取得と出品</h4>
      <ul className="ulstyle">
        <li className="listyle">
          <h5>ASINファイルの入力</h5>
        </li>
        <p>
          下記のようなフォーマットのテキストファイルを入力する。入力したASINが重複していた場合、自動で重複を削除し1つのみ処理します。
          <br />
          ※一度に入力可能なASINに上限は18000個です。
        </p>
        <pre style={{ fontSize: '20px', marginTop: '-25px', marginBottom: '-15px' }}>
          <code>{code}</code>
        </pre>
        <li className="listyle">
          <h5>処理結果確認</h5>
        </li>
        <p>
          取得した商品情報のcsvファイルが、ASINファイルアップロード後、数秒後に結果が表示される。
        </p>
        <li className="listyle">
          <h5>アップロード用ファイル入力</h5>
        </li>
        <p>
          テキストファイルを入力して、対象AISNを日本のセラーアカウントへ出品することができる。
          <br />
          自動出品にしていない場合は、自動で対象のASINが出品される。
        </p>
        <li className="listyle">
          <h5>処理結果確認</h5>
        </li>
        <p>出品処理の結果がcsvファイルとして一覧表示される。</p>
      </ul>

      <h4 style={{ margin: '15px' }}>2. 商品情報取得と出品</h4>

      <h3 className="h3style">お問い合わせ</h3>
      <p>お問い合わせは、下記の連絡先へお願いします。</p>
      <p>メールアドレス : 〇〇@gmail.com</p>

      <h3 className="h3style">ライセンス</h3>
      <p>
        Copyright 2022 creativeLabs Łukasz Holeczek. Code released under the&ensp;
        <a
          href="https://github.com/coreui/coreui-free-bootstrap-admin-template/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT license.
        </a>
      </p>
    </div>
  )
}

export default Dashboard
