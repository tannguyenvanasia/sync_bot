import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { getRandomKeyword } from '@app/utils/keyword';

@Injectable()
export class PinterestService {
  async getRandomPinterest(): Promise<string | null> {
    const keyword = getRandomKeyword();
    const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';

    const payload = new URLSearchParams({
      source_url: `/search/pins/?q=${encodeURIComponent(keyword)}`,
      data: JSON.stringify({
        options: {
          query: keyword,
          scope: 'pins',
          bookmarks: [],
        },
        context: {},
      }),
    });

    const res = await axios.post(url, payload.toString(), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'x-requested-with': 'XMLHttpRequest',
        'x-csrftoken': 'f40be110d8948aa732440aca401bf8a6',
        cookie:
          'ar_debug=1; csrftoken=f40be110d8948aa732440aca401bf8a6; _routing_id="630ff4ec-012c-46b5-b018-bba1c5dea524"; sessionFunnelEventLogged=1; _auth=1; _pinterest_sess=TWc9PSZwa3V0MkZOTVBabXBoM2RFVHlQbjA5MDVCZ05QSmg5WFJpWGJFQjhQQXl0YzY3MVh4OHBYYmp6VUI0MTNtSU1lazFPZzFwNGpzVTlMVUwxeU1lRzJXSEdSaitGK2w1RDR6MGF1TkoyQnQ2SDJRcWlvenYyNGZmOUZlL1Z2RHNtaVJtTjdVcDZETU8wQzI0Znd4VXgvYm1vUmtXam1uTFcwQUQ1NHlNOFNTdG1kVDd4RENRa01YSkk2YTAwVkIxVjdnZVN6Qk9Ga20yTW94aStGQTFpYTlwS3ZoUjVMYVJWdHdzUWdhMnhSUnl3VGJwMnpmbGoyczc4R0VIeUxPS0ZCSjlGdzlucTR5YnhZVlRPSC95V2U2SXRnRzlkaFB6SVROMVN4ZXpXTmczOTl6QlB6eXlxU2hIM0dncVNjM1A1NDFlTVBJSDBnODhBcVQrT0hMdldSS296anhrOXJZSTVQbmRnb0pVNVVLM1dWWGRDclJjaXlGamdGTXV2aVFYQkFiQURTQmU4amNjQjJMcU1JZzJBS0RCWm1SUEFTM1JsakRnMW1oc0IrTG5GVDRPYnpraWpPczAwaDV0ZHdDNlRBRmo5YlIxSDM1RmdVVjRlK0FBNDN5SVRiK3FHTTVlN0N0cTJ5M2tDaTd6Z2RTSWVnZ1E3cEtWTjhQeFN1d3FIRWZMaEMwUWZYZUNNcWw3ZTdUV1J4OU0xVUhpK1JVMzBNY3VDNlZNQmI2MzVLaW9EVTZVdW5FcjdZMEhuNDBsSTFRU0MreUtPUU1rZ0Y2a3M3ZytlSGNIRHRiZHRDRlJwaktjR3lYWk5NYVg4SEJlREdVelRBNysraTFLajZIYUtMbWlpNTFEa3RGaGpyckR4Y2k2VTRFWU9pSDdPemN3akh1WU4rbTBmYkhaU1lZMkJOamIrQ2tQRDJqNkhHV25hZFFpa1lxazcyZmFKMUZJMWlVZ1IwT1pVeGJibGN2TnREVkg0TnJiUlgxS2tyV3NjMkpCZm5MUi9oYkY3ZzdoeXAvRXJOb1ZGdGZJSnFJV2lRbHJnaXQvNjhNRWdLZ1hMN3YzRWtZejZ0UFB2TFl4Q2s4Zld3V1A5dEo5NDJtY3A1MWU3cS85QUxvTGdMcGRLM2VabmdiVnA1Z0pWQTc5NzY0LzV1bURLMm9vYVEwb2IwZXV2Q3h2K3dPRklOQXc5UkIxOGU2elB1em1pS2ZxOGpVS0JpcVZsM3A0YzZyaVVwaUNaSkZta2UvemdWSTVVV2JabURVYkl3czRDWDFRTUYzUERmbGtsamNLYmdWU2MvcDVqTE1PV2VtTFRISGxIR01ORW5UdHIvUkx5Zm5FSXgyQmtDSGlBYlVrRkFHcjIzVzhZeEJrVVR6WTF6TzFtVVc1MUlXeSsvRHFmSkQ4V2dJaXF4cFZFUzdSK2taYXlQblZmam56bGFvSFh4cjRVK21uUnVjQk5wUm5Rak41MUFlSXZZQUQ0dmNHMFNORmx2U1N4MTBTckE2RTBMRk01WEQ0TDRmZ1E2NExBcWxGTFBFWXlFUDA0VnF2ditablF2UGZYVVB6blBKbGtteHFRdGU4RXl3K1QyTi9VRlF2czV1V29yUG1FclJPSERFK3FvYS9HbVRPQWVVSkp6RVlGL0VIRzBUMW5HRm5KbjhwdjJUYk5sNTRFenUrSUFvU01NK2JxVDdiVXR6citidXBsVXNsL0s0c3VpamRoMFRRTEN5ZDNPdllBNmN6TDRQVW9XUHZpU2RKeXhBME1KeHkwSTk2L0M3Nm5TV2dBS2IxM3kmY2R3UC9IbVU2Vk8vK0k4a0VZakg4cXdZa0g4PQ==; __Secure-s_a=T3J3SmlmS0lJeERzb0JWSEhldDdGTDlycmlSanhNdnBxU2dIOXBNaGdid2VLTHRFNnJSaFA2TDExSGFaVkltZEFQbnZFU0FXcU5hczJGS0lqMFZJRGtaSnVuUDRQdDc5VEFSTTRFOGg5ZENoS3FPQUgzM1NYcHVNN21RN1VoR2lZak1QcGNYVHZLY3lIYW1qcHdWSnM1V1RhYXNMdjUvZU91Q1dDMnpPRkNtbjBWOFJ6eklMVmlNL3J1bVQzNm1XRDhiTFc4cStCSG9VbDU2a0g1azNTQ3NjWXFXTHhWK210WVk4V2NVRlpsYlVGbnVxTGN3dDNlb0RTK1BaZ091elFZQUFRdnZWWXR0K0FWMkl2Qzd0VlhPZ1dmNjhSVXU3dmhEMmRTTTErQ0VEYytkN2NYVnJoSHBOd3B2elZJdlBVMkNWdFM1VkxYRGtLRWhnOUJ5UjhVUmZZcEZOSkxKWThwZlZHamREVjcvWFZHQlJkTkIyaVhmeHFOYUkzNFIyc1lpM2dLSmdlK2RkaThlb1ZWcThVM254dWFydFV3ZlBtanlvUU10a0tlVDh5ei82cEZnREtIWnBCd0x0bktDUEp2TTlHQUx0Y3cvV0pWVGczck9uR0htR2FlQk5ZMmtpTlBuQ3FLTzQ5WTRUd1NCektIR0hTajMzVHVDM3pCakVkR0d2VkdkRnNjTndYbHVpSCtSZ3RiN2tKWkhZSlVmcEZqLzhTbk42SFhOWk1DOEFqZUZTNFA3UjdhWU5YejRFVTY3cXdUWjVaclFNNmZOcytaV0xSd2NOQUd6bE0yRGZVM0tacjhPa1JrSldyN0dqNk13KzJLK0pBSytlakhieXl4MzdoYnhLTm1oSkJUTUw2cDF5ZjlUSDFURFJINmt4WUZWRmZKZ2poWDhtV2pHV1RMTWttamJId2tiVGx5UkNUYWgrbXU1aHA2amM0QlRZai9lNjdVTzZIRUwwMEREL0o1OVJJNEYxdlhFTC9Tb2JTZHdYVXVJeThGVFdzVXh3SXNDelMwT0dlVjl1aHkwMVBKdUo0ZkFnQW5paXdrd0VKNDliY3pXM3dha3FuUFNWSU1iekFUSE1MY3U3RzlEaVhvMi9zcW9GWXJQMjJETGVLRjVibUNKMWE4UWNHUXN5RkMyZTFOa2Q4Nlkra3BwU3E5WDc1MjFHR3J0YzUyVXJLWFg1OWVvakFFbzcraXd1TkRsYTlVWkZuRjJtM0lCenhpdGdQQzZHOWo1NEM5OXUrVElmRUxzbVFhUlZhVm5GSCtjbkdJZGxQWDQ4cGxHWFVYditZY2FTMFhka1VLaWV4Y2QxSWRxSWNrOD0mNk51SEJqRVJVaU51a1BUamtLRE9DTGE4T2M0PQ==; _b="AZCyd4XWtbRKqY4dHSPXY1AGAXr+tsxCgmJ/aCLISChQobIlczGDaZgbzb01H+TXRdY="; g_state={"i_l":0,"i_ll":1768557548186,"i_b":"fiYqz1t7khe50mfXScqP5+GY2MAOtxgOxjf0jKB53fQ","i_e":{"enable_itp_optimization":0}}',
      },
    });

    const pins = res.data?.resource_response?.data?.results ?? [];

    if (!pins.length) return null;

    // 🎲 random 1 pin
    const randomPin = pins[Math.floor(Math.random() * pins.length)];

    return (
      randomPin?.images?.orig?.url ?? randomPin?.images?.['736x']?.url ?? null
    );
  }
}
