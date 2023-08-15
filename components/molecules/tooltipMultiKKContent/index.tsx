import React from 'react'
import { IconInfo } from '../../atoms/icon'
import { Col, Row } from 'antd'

interface Props {
  onClick?: () => void
}

const TooltipContentMultiKK = ({ onClick }: Props) => {
  return (
    <div>
      <Row>
        <Col span={3}>
          <IconInfo width={24} height={24} color="white" />
        </Col>
        <Col span={21}>
          <p
            style={{
              fontSize: '11px',
              fontFamily: 'OpenSans',
              color: 'white',
              lineHeight: '16px',
            }}
          >
            Dapatkan hasil{' '}
            <span
              style={{
                fontWeight: '700',
                color: 'white',
                fontSize: '11px',
                fontFamily: 'OpenSansBold',
                lineHeight: '16px',
              }}
            >
              persetujuan kredit instan
            </span>{' '}
            dari perusahaan pembiayaan Astra tanpa perlu survey ke rumah!{' '}
          </p>
          <p
            style={{
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: 'OpenSansBold',
              color: 'white',
              marginTop: '12px',
              lineHeight: '16px',
            }}
            onClick={onClick}
          >
            OK, Saya Mengerti
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default TooltipContentMultiKK
